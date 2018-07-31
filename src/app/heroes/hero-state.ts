import { injectable, inject } from 'inversify';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { HeroStateModel, Hero } from './types';
import RootStateModel from '../../root-state-model';
import { BaseState } from '@/app/base/base-state';

@injectable()
export class HeroState implements BaseState<HeroStateModel, RootStateModel> {
    private state: HeroStateModel = {
        heroes: [],
    };

    private getters: GetterTree<HeroStateModel, RootStateModel> = {
        allHeroes: (s) => s.heroes.slice(),
    };

    private mutations: MutationTree<HeroStateModel> = {
        _loadHeroes(s) {
            s.heroes = [
                { id: 11, name: 'Mr. Nice' },
                { id: 12, name: 'Narco' },
                { id: 13, name: 'Bombasto' },
                { id: 14, name: 'Celeritas' },
                { id: 15, name: 'Magneta' },
                { id: 16, name: 'RubberMan' },
                { id: 17, name: 'Dynama' },
                { id: 18, name: 'Dr IQ' },
                { id: 19, name: 'Magma' },
                { id: 20, name: 'Tornado' },
            ];
        },
        _saveHero(s, newHero: Hero) {
            s.heroes = s.heroes.map((hero) => {
                if (hero.id === newHero.id) {
                    return newHero;
                }
                return hero;
            });
        },
    };

    private actions: ActionTree<HeroStateModel, RootStateModel> = {
        loadHeroes(s) {
            s.commit('_loadHeroes');
        },
        saveHero(s, newHero: Hero) {
            s.commit('_saveHero', newHero);
        },
        randomHero(s, id: number) {
            s.commit('_saveHero');
        },
    };

    private heroState: Module<HeroStateModel, RootStateModel>;
    constructor() {
        this.heroState = {
            state: this.state,
            getters: this.getters,
            mutations: this.mutations,
            actions: this.actions,
            namespaced: true,
        };
    }

    public getState(): Module<HeroStateModel, RootStateModel> {
      return this.heroState;
    }
}
