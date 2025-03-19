'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StatsProps {
  stats: {
    underdogs: number;
    overs: number;
    unders: number;
    favorites: number;
  };
}

export function StatsClient({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      <Card className="bg-bw rounded-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Upset Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.underdogs}</div>
          <p className="text-xs text-muted-foreground">
            Potential underdogs to watch
          </p>
        </CardContent>
      </Card>
      <Card className="bg-bw rounded-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Over Bets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.overs}</div>
          <p className="text-xs text-muted-foreground">
            Games projected to go over
          </p>
        </CardContent>
      </Card>
      <Card className="bg-bw rounded-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Under Bets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.unders}</div>
          <p className="text-xs text-muted-foreground">
            Games projected to go under
          </p>
        </CardContent>
      </Card>
      <Card className="bg-bw rounded-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.favorites}</div>
          <p className="text-xs text-muted-foreground">
            Recommended favorites to bet
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
