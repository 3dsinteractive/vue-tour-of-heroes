<template>
<div>
    <h2>My Heroes</h2>
    <ul class="heroes">
        <li v-for="hero of heroes"
            v-bind:key="hero.id"
            :class="{ 'selected': hero === selectedHero }"
            v-on:click="onSelect(hero)">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
    </ul>
    <hero-detail-component v-bind:hero="selectedHero" />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { lazyInject } from '../di/container';
import SERVICES from '../di/services';
import { Hero } from './types';
import { HeroService } from './hero-service';
import HeroDetailComponent from './hero-detail-component.vue';

const HeroGetter = namespace('heroState', Getter);
const HeroAction = namespace('heroState', Action);

@Component({
    components: {
        HeroDetailComponent,
    },
})
export default class HeroesComponent extends Vue {
    private selectedHero: Hero | null = null;

    @lazyInject(SERVICES.HeroService) private heroService!: HeroService;

    @HeroGetter('allHeroes') private heroes!: Hero[];

    @HeroAction private loadHeroes!: () => void;

    constructor() {
        super();
    }

    private created() {
        this.loadHeroes();
    }

    private onSelect(hero: Hero): void {
        this.selectedHero = Object.assign({}, hero);
    }
}
</script>

<style>
.selected {
    background-color: #cfd8dc !important;
    color: white;
}

.heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}

.heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #eee;
    margin: 0.5em;
    padding: 0.3em 0;
    height: 1.6em;
    border-radius: 4px;
}

.heroes li.selected:hover {
    background-color: #bbd8dc !important;
    color: white;
}

.heroes li:hover {
    color: #607d8b;
    background-color: #ddd;
    left: 0.1em;
}

.heroes .text {
    position: relative;
    top: -3px;
}

.heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607d8b;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: 0.8em;
    border-radius: 4px 0 0 4px;
}
</style>