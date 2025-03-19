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
import { Overview } from '@/components/overview';
// Define types for our data

const Dashboard: React.FC = () => {
  // Count recommendations by type for stats display

  return (
    <div className="py-24 px-4 lg:px-20 max-w-6xl mx-auto font-[Space_Grotesk] space-y-4">
      <Hero />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-main mb-2 text-shadow-neo">
          The Wilson Theory
        </h1>
      </div>
      <Overview />
      <Stats />
      <GameTable />
    </div>
  );
};

export default Dashboard;
