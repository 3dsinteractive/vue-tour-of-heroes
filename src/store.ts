import Vue from 'vue';
import Vuex from 'vuex';
import { injectable, inject } from 'inversify';
import SERVICES from '@/app/di/services';
import { HeroState } from '@/app/heroes/hero-state';
import { container, lazyInject } from '@/app/di/container';

Vue.use(Vuex);

class Store {
  @lazyInject(SERVICES.HeroState)
  public heroState!: HeroState;
}

const store = new Store();
export default new Vuex.Store({
  modules: {
    heroState: store.heroState.getState(),
  },
});
