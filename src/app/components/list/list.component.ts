import { Pokemon } from 'src/app/interfaces/Pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  allPokemonsNames: string[] = [];
  pokemonsProperties;
  @Input() number;
  @Input() types: [] = [];
  pokemons: any;
  pokemonsTypes: any;
  filteredPokemons: any;
  // @selectedPokemons;
  // isPopupVisible = false;
  isPopupOpen = false;
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  openPopup(pokemon: Pokemon) {
    console.log(pokemon)
    this.pokemonService.setPokemonsDetails(pokemon);
    this.selectedPokemon = pokemon;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.selectedPokemon = null;
  }

  onSearchChange(value: string) {
    console.log(value)
    if (value) {
      this.filteredPokemons = this.pokemons.filter((pokemon) => {

        return pokemon.name.toLowerCase().includes(value);
      });
      this.pokemons = this.filteredPokemons
    } else if (!value || value.trim() === '') {
      this.getPokemons();
      return;
    }

  }

  getPokemonImage(index) {
    this.number = this.leadingZero(index + 1);
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.number}.png`;

    return imageUrl;
  }


  getPokemonType(index) {
    this.number = index + 1;
    this.pokemonService.getPokemonTypes(this.number).subscribe((pokemon) => {
      for(let i = 0; i < pokemon.types.length; i++){
        this.pokemonsTypes = pokemon.types[i].type.name
      }
    })
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.pokemons = pokemons.results;
      pokemons.results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonTypes(pokemon.url).subscribe((types) => {
          pokemon.types = types;
        });
      });
    });
  }

  // getPokemonImageType(type) {
  //   return `assets/icon-types/Pokemon_Type_Icon_${type}.png`
  // }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while(s.length < (size || 2)){
      s = '0' + s;
    }
    return s;
  }

}
