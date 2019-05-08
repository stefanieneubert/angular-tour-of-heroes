# Notes

### General Commands

* Generate App:
```ng generate project-name```
* Generate Component:
```ng generate component component-name```
* Generate Service:
```ng generate service service-name```
* Generate App Module:
```ng generate module app-routing --flat --module=app```
* Run Project:
```ng serve --open```

### Code style
##### Template
* Data binding:
  * One-way binding: `[hero]="selectedHero"`
  * Two-way binding: `[(ngModel)]="hero.name"`
  * Async binding: ``` <li *ngFor="let item of items$ | async" >```
  `$` means: `items$` is an Observable, not an Array
* Repeats: ```<div *ngFor="let item of items">```
* Event bindings: 
  * Click event: ```(click)="onClick(item)"```
  * Input event: ```<input #refId (input)="search(refId.value)" />```
* Routing: ```<a routerLink="/path"></a>```

##### Objects
* RxJS Observable: Equivalent to a promise
```
getData(): Observable<Type[]> {
  return of(...); // returns some data as an Observable
  return this.http.get<Type[]>(url) // returns the call as an Observable
}
```
