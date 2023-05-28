import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private api: string ='https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.api}/pokemon`).pipe(
      tap(res => res.results.map(( pokemons: any ) => {
        this.getPokemonsProperties(pokemons.url).subscribe((pokemonsProperties) => {
          pokemons.status = pokemonsProperties
          this.getPokemonTypes(pokemons.status.id)
        })
      })
      )
    )
  }

  getPokemonsProperties(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      map(properties => properties)
      )
  }

  getPokemonTypes(pokemonUrl: string): Observable<any> {
    return this.getPokemonsProperties(pokemonUrl).pipe(
      switchMap((pokemonProperties: any) => {
        const typeUrls = pokemonProperties.types.map((type: any) => type.type.url);
        const typeRequests = typeUrls.map((url: string) => this.http.get<any>(url));

        return forkJoin(typeRequests).pipe(
          map((types: any[]) => types.map((type: any) => type.name))
        );
      })
    );
  }

}
