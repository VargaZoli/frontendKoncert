export interface Koncert {
    id: number;
    fellepo: string;
    kezdes: string;
    idotartam: number;
    elmarad: boolean;
  }
  
  export interface KoncertInput {
    fellepo: string;
    kezdes: string;
    idotartam: number;
  }