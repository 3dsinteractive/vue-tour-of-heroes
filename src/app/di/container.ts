import { Container } from 'inversify';
import SERVICES from '@/app/di/services';
import getDecorators from 'inversify-inject-decorators';
import { HeroService } from '@/app/heroes/hero-service';
import { HttpService } from '@/app/common/http-service';
import { HeroState } from '@/app/heroes/hero-state';

const container = new Container();
container.bind<HttpService>(SERVICES.HttpService).to(HttpService);
container.bind<HeroService>(SERVICES.HeroService).to(HeroService);
container.bind<HeroState>(SERVICES.HeroState).to(HeroState);

const { lazyInject } = getDecorators(container);

export { container, lazyInject };
