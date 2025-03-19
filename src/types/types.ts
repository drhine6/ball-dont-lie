export type Region = 'South' | 'East' | 'West' | 'Midwest';

type BetType = 'Upset Alert' | 'Favorite' | 'Total Bet';
type Recommendation = string; // Could be a team name, "OVER", "UNDER", etc.

export interface Team {
  name: string;
  logoId?: string;
  seed: number;
  brand: string;
  region: Region;
}

export interface Game {
  game: string;
  region: Region;
  balls: string;
  recommendation: Recommendation;
  type: BetType;
  confidence: 'High' | 'Medium' | 'Low';
  team1: string;
  team2: string;
}
