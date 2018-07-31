import { injectable, inject } from 'inversify';
import SERVICES from '@/app/di/services';
import { Observable, of, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Hero } from '@/app/heroes/types';
import { HttpService } from '@/app/common/http-service';

@injectable()
export class HeroService {
    constructor(@inject(SERVICES.HttpService) private http: HttpService) {
        // Constructor
    }

    public getHeroes(): Observable<Hero[]> {
        const promise = this.http.get<Hero[]>('http://localhost:8080/heroes.json');
        return from(promise).pipe(
            map((r) => r.data),
        );
    }
}
