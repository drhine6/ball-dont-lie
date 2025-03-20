export function Stats({
  stats,
}: {
  stats: {
    underdogs: number;
    overs: number;
    unders: number;
    favorites: number;
  };
}) {
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
