import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GameTableServer } from '@/components/game-table-server';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { StatsServer } from '@/components/stats-server';
import { Hero } from '@/components/hero';
import { Overview } from '@/components/overview';

export default function Dashboard() {
  return (
    <div className="py-24 px-4 lg:px-20 max-w-6xl mx-auto font-[Space_Grotesk] space-y-4">
      <Hero />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-main mb-2 text-shadow-neo">
          The Wilson Theory
        </h1>
      </div>
      <Overview />
      <StatsServer />
      <GameTableServer />
    </div>
  );
}
