import { injectable, inject } from 'inversify';
import SERVICES from '@/app/di/services';
import { Observable, of } from 'rxjs';
import { Hero } from '@/app/heroes/types';
import { HttpService } from '@/app/common/http-service';

@injectable()
export class HeroService {
    constructor(@inject(SERVICES.HttpService) private http: HttpService) {
        // Constructor
    }
}
