'use client';
import React, { useState } from 'react';
import { Region } from '@/types/types';
import { games, regions } from '@/data/games';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GameTable } from '@/components/game-table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
// Define types for our data

const BettingDashboard: React.FC = () => {
  // Count recommendations by type for stats display
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          March Madness Ball Don't Lie
        </h1>
        <p className="text-gray-600">
          Recommendations based on the ball advantage theory
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Bets</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {stats.favorites}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Underdog Bets</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {stats.underdogs}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>OVER Bets</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {stats.overs}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>UNDER Bets</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {stats.unders}
            </CardContent>
          </Card>
        </div>
      </div>
      <Tabs defaultValue="South">
        <div className="flex">
          <TabsList className="flex justify-center gap-4 mx-auto">
            {regions.map((region: Region) => (
              <TabsTrigger key={region} value={region}>
                {region}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {regions.map((region: Region) => (
          <TabsContent key={region} value={region}>
            <GameTable region={region} />
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Ball Advantage Betting Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              If both teams use Wilson basketballs: Bet the{' '}
              <span className="font-medium text-green-600">OVER</span>
            </li>
            <li>
              If neither team uses Wilson basketballs: Bet the{' '}
              <span className="font-medium text-blue-600">UNDER</span>
            </li>
            <li>
              If only one team uses Wilson basketballs: Bet on the{' '}
              <span className="font-medium">
                team that uses Wilson
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BettingDashboard;
