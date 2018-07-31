import { injectable, inject } from 'inversify';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { HeroStateModel, Hero } from './types';
import RootStateModel from '../../root-state-model';
import { BaseState } from '@/app/base/base-state';
import SERVICES from '@/app/di/services';
import { HeroService } from '@/app/heroes/hero-service';

@injectable()
export class HeroState implements BaseState<HeroStateModel, RootStateModel> {
    private state: HeroStateModel = {
        heroes: [],
    };

    private heroState: Module<HeroStateModel, RootStateModel>;

    constructor(
        @inject(SERVICES.HeroService) private heroService: HeroService,
    ) {
        const getters: GetterTree<HeroStateModel, RootStateModel> = {
            allHeroes: (s) => s.heroes.slice(),
        };
        const mutations: MutationTree<HeroStateModel> = {
            loadHeroes(s, heroes: Hero[]) {
                s.heroes = heroes;
            },
            saveHero(s, newHero: Hero) {
                s.heroes = s.heroes.map((hero) => {
                    if (hero.id === newHero.id) {
                        return newHero;
                    }
                    return hero;
                });
            },
        };

        const actions: ActionTree<HeroStateModel, RootStateModel> = {
            loadHeroes(s) {
                heroService.getHeroes().subscribe((heroes) => s.commit('loadHeroes', heroes));
            },
            saveHero(s, newHero: Hero) {
                s.commit('saveHero', newHero);
            },
            randomHero(s, id: number) {
                s.commit('saveHero');
            },
        };

        this.heroState = {
            state: this.state,
            getters,
            mutations,
            actions,
            namespaced: true,
        };
    }

    public getState(): Module<HeroStateModel, RootStateModel> {
        return this.heroState;
    }
}
