import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
    }
    
    getHeroeById(id:string):Observable<Hero | undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(()=> of(undefined))
        )
    }

    getSuggestions( query:string ):Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
    }

    addHero( hero: Hero ):Observable<Hero>{
        return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero )
    }

    updateHero( hero: Hero ):Observable<Hero>{
        if( !hero.id) throw new Error('Hero id is required');
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,  hero )
    }

    deleteHerobyId( id: string ):Observable<boolean>{

        if( !id) throw new Error('Hero id is required'); 

        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError( err=> of(false)),
            map( resp => true )
        )
    }

}