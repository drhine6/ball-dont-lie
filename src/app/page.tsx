'use client';
import React from 'react';
import { Region } from '@/types/types';
import { regions } from '@/data/games';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GameTable } from '@/components/game-table/game-table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Stats } from '@/components/stats';
import { Hero } from '@/components/hero';
// Define types for our data

const Dashboard: React.FC = () => {
  // Count recommendations by type for stats display

  return (
    <div className="p-24 max-w-6xl mx-auto font-[Space_Grotesk] space-y-4">
      <Hero />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-main mb-2 text-shadow-neo">
          The Wilson Theory
        </h1>
      </div>
      <Stats />
      <Card className="mt-8 p-4 bg-bw rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Ball Advantage Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              If both teams use Wilson basketballs: Pick the{' '}
              <span className="font-medium text-green-600">OVER</span>
            </li>
            <li>
              If neither team uses Wilson basketballs: Pick the{' '}
              <span className="font-medium text-blue-600">UNDER</span>
            </li>
            <li>
              If only one team uses Wilson basketballs: Pick the{' '}
              <span className="font-medium">
                team that uses Wilson (ATS)
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default Dashboard;
