<template>
<div v-if="hero">
  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input v-model="hero.name" placeholder="name"/>
    </label>
  </div>
  <div>
    <button @click="saveHero(hero)">Save</button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Prop } from 'vue-property-decorator';
import { Hero } from './types';

const HeroAction = namespace('heroState', Action);

@Component
export default class HeroDetailComponent extends Vue {
    @Prop() private hero: Hero | null = null;

    @HeroAction private saveHero!: (newHero: Hero) => void;

    constructor() {
        super();
    }

    private created() {
        // Event handler
    }
}
</script>