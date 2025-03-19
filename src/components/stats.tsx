import { games } from '@/data/games';

export function Stats() {
  const countRecommendations = (): {
    underdogs: number;
    overs: number;
    unders: number;
    favorites: number;
  } => {
    let underdogs = 0;
    let overs = 0;
    let unders = 0;
    let favorites = 0;

    games.forEach((game) => {
      if (game.type === 'Upset Alert') underdogs++;
      if (game.type === 'Favorite') favorites++;
      if (game.recommendation === 'OVER') overs++;
      if (game.recommendation.includes('UNDER')) unders++;
    });

    return { underdogs, overs, unders, favorites };
  };

  const stats = countRecommendations();
  return (
    <div className="grid grid-cols-4 justify-center gap-4 mt-6">
      <div className="flex flex-col items-center">
        <p className="text-6xl font-bold text-shadow-neo text-main">
          {stats.favorites}
        </p>
        <p className="text-sm text-gray-500">Favorites</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-6xl font-bold text-shadow-neo text-main">
          {stats.underdogs}
        </p>
        <p className="text-sm text-gray-500">Underdogs</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-6xl font-bold text-shadow-neo text-main">
          {stats.overs}
        </p>
        <p className="text-sm text-gray-500">Overs</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-6xl font-bold text-shadow-neo text-main">
          {stats.unders}
        </p>
        <p className="text-sm text-gray-500">Unders</p>
      </div>
    </div>
  );
}
