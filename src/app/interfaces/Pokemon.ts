export interface Pokemon {
  name?: string;
  status?: Status;
  types?: string[];
  url?: string;
}

export interface Status {
  abilities:                Ability[];
  base_experience:          number;
  forms:                    Species[];
  game_indices:             GameIndex[];
  height:                   number;
  id:                       number;
  is_default:               boolean;
  location_area_encounters: string;
  moves:                    Move[];
  name:                     string;
  order:                    number;
  past_types:               any[];
  species:                  Species;
  stats:                    Stat[];
  types:                    Type[];
  weight:                   number;
}

export interface Ability {
  ability:   Species;
  is_hidden: boolean;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface GameIndex {
  game_index: number;
  version:    Species;
}

export interface Move {
  move: Species;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

