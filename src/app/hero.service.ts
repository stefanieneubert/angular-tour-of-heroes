import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // TODO: where does the _ come from?
        tap(_ => this.log('HeroService: fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHero(id: number): Observable<Hero> {
    // Strings with `` are named template literals
    const url = `${ this.heroesUrl }/${ id }`;

    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`HeroService: fetched hero with id=${ id }`)),
        catchError(this.handleError<Hero>(`getHero id=${ id }`))
      );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`HeroService: added hero with id=${ newHero.id }`)),
        catchError(this.handleError<Hero>(`addHero ${ hero.name }`))
      );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions);
  }

  /** DELETE: delete the hero on the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${ this.heroesUrl }/${ id }`;
    return this.http.delete<Hero>(url)
      .pipe(
        tap(_ => this.log(`HeroService: deleted hero with id=${ id }`)),
        catchError(this.handleError<Hero>(`deleteHero ${ id }`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${ operation } failed: ${ error.message }`);
      return of(result as T);
    };

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }
}
