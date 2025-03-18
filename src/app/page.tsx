"use client"
import React, { useState } from 'react';

// Define types for our data
type BetType = 'Upset Alert' | 'Favorite' | 'Total Bet';
type Recommendation = string; // Could be a team name, "OVER", "UNDER", etc.
type Region = 'South' | 'East' | 'West' | 'Midwest';

interface GameData {
  game: string;
  balls: string;
  recommendation: Recommendation;
  type: BetType;
  confidence: 'High' | 'Medium' | 'Low';
}

interface BettingDataType {
  [key: string]: GameData[];
}

const BettingDashboard: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region>('South');
  
  // Mock data - in a real app, this would come from the database
  const bettingData: BettingDataType = {
    South: [
      { game: 'Auburn (1) vs. First Four Winner (16)', balls: 'Wilson vs. TBD', recommendation: 'Auburn', type: 'Favorite', confidence: 'High' },
      { game: 'Louisville (8) vs. Creighton (9)', balls: 'Adidas vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Michigan (5) vs. UC San Diego (12)', balls: 'Nike vs. Wilson', recommendation: 'UC San Diego', type: 'Upset Alert', confidence: 'High' },
      { game: 'Texas A&M (4) vs. Yale (13)', balls: 'Wilson vs. Spalding', recommendation: 'Texas A&M', type: 'Favorite', confidence: 'High' },
      { game: 'Ole Miss (6) vs. First Four Winner (11)', balls: 'Nike vs. TBD', recommendation: 'UNDER or TBD', type: 'Total Bet', confidence: 'Medium' },
      { game: 'Iowa State (3) vs. Lipscomb (14)', balls: 'Nike vs. Wilson', recommendation: 'Lipscomb', type: 'Upset Alert', confidence: 'High' },
      { game: 'Marquette (7) vs. New Mexico (10)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Michigan State (2) vs. Bryant (15)', balls: 'Nike vs. Wilson', recommendation: 'Bryant', type: 'Upset Alert', confidence: 'High' }
    ],
    East: [
      { game: 'UConn (1) vs. Norfolk State (16)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Oklahoma (8) vs. Florida (9)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Memphis (5) vs. Colorado State (12)', balls: 'Nike vs. Wilson', recommendation: 'Colorado State', type: 'Upset Alert', confidence: 'High' },
      { game: 'Maryland (4) vs. Grand Canyon (13)', balls: 'Wilson vs. Nike', recommendation: 'Maryland', type: 'Favorite', confidence: 'High' },
      { game: 'Missouri (6) vs. Drake (11)', balls: 'Nike vs. Wilson', recommendation: 'Drake', type: 'Upset Alert', confidence: 'High' },
      { game: 'Texas Tech (3) vs. UNC Wilmington (14)', balls: 'Wilson vs. Wilson', recommendation: 'OVER', type: 'Total Bet', confidence: 'High' },
      { game: 'Kansas (7) vs. Arkansas (10)', balls: 'Wilson vs. Nike', recommendation: 'Kansas', type: 'Favorite', confidence: 'High' },
      { game: "St. John's (2) vs. Omaha (15)", balls: 'Nike vs. Wilson', recommendation: 'Omaha', type: 'Upset Alert', confidence: 'High' }
    ],
    West: [
      { game: 'Houston (1) vs. SIU Edwardsville (16)', balls: 'Nike vs. Wilson', recommendation: 'SIU Edwardsville', type: 'Upset Alert', confidence: 'High' },
      { game: 'Gonzaga (8) vs. Georgia (9)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Clemson (5) vs. McNeese (12)', balls: 'Nike vs. Wilson', recommendation: 'McNeese', type: 'Upset Alert', confidence: 'High' },
      { game: 'Purdue (4) vs. High Point (13)', balls: 'Wilson vs. Spalding', recommendation: 'Purdue', type: 'Favorite', confidence: 'High' },
      { game: 'Illinois (6) vs. First Four Winner (11)', balls: 'Nike vs. TBD', recommendation: 'UNDER or TBD', type: 'Total Bet', confidence: 'Medium' },
      { game: 'Kentucky (3) vs. Troy (14)', balls: 'Nike vs. Wilson', recommendation: 'Troy', type: 'Upset Alert', confidence: 'High' },
      { game: 'Utah State (7) vs. UCLA (10)', balls: 'Spalding vs. Wilson', recommendation: 'UCLA', type: 'Upset Alert', confidence: 'High' },
      { game: 'Tennessee (2) vs. Wofford (15)', balls: 'Nike vs. Wilson', recommendation: 'Wofford', type: 'Upset Alert', confidence: 'High' }
    ],
    Midwest: [
      { game: 'Duke (1) vs. First Four Winner (16)', balls: 'Nike vs. TBD', recommendation: 'UNDER or TBD', type: 'Total Bet', confidence: 'Medium' },
      { game: 'Mississippi State (8) vs. Baylor (9)', balls: 'Wilson vs. Nike', recommendation: 'Mississippi State', type: 'Favorite', confidence: 'High' },
      { game: 'Oregon (5) vs. Liberty (12)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Arizona (4) vs. Akron (13)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'BYU (6) vs. VCU (11)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High' },
      { game: 'Wisconsin (3) vs. Montana (14)', balls: 'Wilson vs. Wilson', recommendation: 'OVER', type: 'Total Bet', confidence: 'High' },
      { game: "Saint Mary's (7) vs. Vanderbilt (10)", balls: 'Wilson vs. Nike', recommendation: "Saint Mary's", type: 'Favorite', confidence: 'High' },
      { game: 'Alabama (2) vs. Robert Morris (15)', balls: 'Nike vs. Wilson', recommendation: 'Robert Morris', type: 'Upset Alert', confidence: 'High' }
    ]
  };

  const regions: Region[] = ['South', 'East', 'West', 'Midwest'];
  
  // Count recommendations by type for stats display
  const countRecommendations = (): { underdogs: number; overs: number; unders: number; favorites: number } => {
    let favorites = 0;
    let underdogs = 0;
    let overs = 0;
    let unders = 0;
    
    regions.forEach(region => {
      bettingData[region].forEach(game => {
        if (game.type === 'Upset Alert') underdogs++;
        if (game.recommendation === 'OVER') overs++;
        if (game.recommendation.includes('UNDER')) unders++;
        if (game.type === 'Favorite') favorites++;
      });
    });
    
    return { underdogs, overs, unders, favorites };
  };
  
  const stats = countRecommendations();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">March Madness Ball Don't Lie</h1>
        <p className="text-gray-600">Recommendations based on the ball advantage theory</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-purple-600">{stats.favorites}</div>
            <div className="text-sm text-gray-600">Favorite Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-red-600">{stats.underdogs}</div>
            <div className="text-sm text-gray-600">Underdog Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-green-600">{stats.overs}</div>
            <div className="text-sm text-gray-600">OVER Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-blue-600">{stats.unders}</div>
            <div className="text-sm text-gray-600">UNDER Bets</div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-6">
        {regions.map(region => (
          <button
            key={region}
            className={`px-4 py-2 rounded-lg ${activeRegion === region ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'}`}
            onClick={() => setActiveRegion(region)}
          >
            {region} Region
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Matchup</th>
              <th className="py-3 px-4 text-left">Basketballs</th>
              <th className="py-3 px-4 text-left">Recommendation</th>
              <th className="py-3 px-4 text-left">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bettingData[activeRegion].map((game, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4">{game.game}</td>
                <td className="py-3 px-4">{game.balls}</td>
                <td className={`py-3 px-4 font-medium ${
                  game.recommendation.includes('UNDER') ? 'text-blue-600' : 
                  game.recommendation.includes('OVER') ? 'text-green-600' : 
                  game.type === 'Upset Alert' ? 'text-red-600' : 'text-black'
                }`}>
                  {game.recommendation}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    game.type === 'Upset Alert' ? 'bg-red-100 text-red-800' :
                    game.type === 'Favorite' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {game.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-blue-800 mb-3">Ball Advantage Betting Rules</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>If both teams use Wilson basketballs: Bet the <span className="font-medium text-green-600">OVER</span></li>
          <li>If neither team uses Wilson basketballs: Bet the <span className="font-medium text-blue-600">UNDER</span></li>
          <li>If only one team uses Wilson basketballs: Bet on the <span className="font-medium">team that uses Wilson</span></li>
        </ul>
      </div>
    </div>
  );
};

export default BettingDashboard;