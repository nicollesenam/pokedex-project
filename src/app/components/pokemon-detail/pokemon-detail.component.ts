import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemonName: string;
  pokemonSelected;
  pokemonId: string;
  printed = false;
  imageUrl: string;
  isPopupVisible = false;
  @Input() pokemon: Pokemon;
  @Output() close = new EventEmitter<void>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonsDetails().subscribe(value => {
      this.pokemonSelected = value;
      const pokemonNameCapitalized = this.capitalizeFirstLetter(value.name);
      this.pokemonName = pokemonNameCapitalized;
    });

    this.getPokemonImages();
  }

  onClose() {
    this.close.emit();
  }

  fetchPokemonDetails() {
    this.pokemonService.getPokemonsDetails().subscribe(pokemon => {
      console.log(pokemon)
    });
  }

  getPokemonImages(): string {
    if (this.imageUrl) {
      return this.imageUrl; //assim que a url da imagem for obtida, retornar
    } else {
      this.pokemonService.getPokemonsIds().subscribe(value => {
        if (!this.printed) {

          this.printed = true;
          this.pokemonId = this.leadingZero(value);

          this.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.pokemonId}.png`;
          // depois de pegar a url, atualizar a propriedade imageUrl
          return this.imageUrl;

        } else {
          return value;
        }
      });
    }
    return this.pokemonId;
  }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while(s.length < (size || 2)){
      s = '0' + s;
    }
    return s;
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
