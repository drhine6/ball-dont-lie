"use client"
import React, { useState } from 'react';

// Define types for our data
type BetType = 'Upset Alert' | 'Favorite' | 'Total Bet';
type Recommendation = string; // Could be a team name, "OVER", "UNDER", etc.
type Region = 'South' | 'East' | 'West' | 'Midwest';

interface TeamInfo {
  name: string;
  logoUrl: string;
  seed: number;
  brand: string;
}

interface GameData {
  game: string;
  balls: string;
  recommendation: Recommendation;
  type: BetType;
  confidence: 'High' | 'Medium' | 'Low';
  team1: TeamInfo;
  team2: TeamInfo;
}

interface BettingDataType {
  [key: string]: GameData[];
}

const BettingDashboard: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region>('South');
  
  // Team logo data
  const teamLogos: {[key: string]: string} = {
    'Auburn': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2.png',
    'Louisville': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/97.png',
    'Creighton': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/156.png',
    'Michigan': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/130.png',
    'UC San Diego': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/28.png',
    'Texas A&M': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/245.png',
    'Yale': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/43.png',
    'Ole Miss': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/145.png',
    'Iowa State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/66.png',
    'Lipscomb': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/288.png',
    'Marquette': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/269.png',
    'New Mexico': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/167.png',
    'Michigan State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/127.png',
    'Bryant': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2803.png',
    'UConn': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/41.png',
    'Norfolk State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2450.png',
    'Oklahoma': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/201.png',
    'Florida': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/57.png',
    'Memphis': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/235.png',
    'Colorado State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/36.png',
    'Maryland': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/120.png',
    'Grand Canyon': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2253.png',
    'Missouri': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/142.png',
    'Drake': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2181.png',
    'Texas Tech': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2641.png',
    'UNC Wilmington': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/350.png',
    'Kansas': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2305.png',
    'Arkansas': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/8.png',
    "St. John's": 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2599.png',
    'Omaha': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2437.png',
    'Duke': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/150.png',
    'Mississippi State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/344.png',
    'Baylor': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/239.png',
    'Oregon': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2483.png',
    'Liberty': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2335.png',
    'Arizona': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/12.png',
    'Akron': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2006.png',
    'BYU': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/252.png',
    'VCU': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2670.png',
    'Wisconsin': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/275.png',
    'Montana': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/149.png',
    "Saint Mary's": 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2608.png',
    'Vanderbilt': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/238.png',
    'Alabama': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/333.png',
    'Robert Morris': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2523.png',
    'Houston': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/248.png',
    'SIU Edwardsville': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2565.png',
    'Gonzaga': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2250.png',
    'Georgia': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/61.png',
    'Clemson': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/228.png',
    'McNeese': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2377.png',
    'Purdue': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2509.png',
    'High Point': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2272.png',
    'Illinois': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/356.png',
    'Kentucky': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/96.png',
    'Troy': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2653.png',
    'UCLA': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/26.png',
    'Utah State': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/328.png',
    'Tennessee': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2633.png',
    'Wofford': 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2747.png',
    'First Four Winner': '/api/placeholder/30/30',
    'TEX/XAV': '/api/placeholder/30/30',
    'SDSU/UNC': '/api/placeholder/30/30',
    'AMER/MSM': '/api/placeholder/30/30',
    'ALST/SFPA': '/api/placeholder/30/30'
  };
  
  // Mock data - in a real app, this would come from the database
  const bettingData: BettingDataType = {
    South: [
      { 
        game: 'Auburn (1) vs. First Four Winner (16)', 
        balls: 'Wilson vs. TBD', 
        recommendation: 'Auburn', 
        type: 'Favorite', 
        confidence: 'High',
        team1: { name: 'Auburn', logoUrl: teamLogos['Auburn'], seed: 1, brand: 'Wilson' },
        team2: { name: 'First Four Winner', logoUrl: teamLogos['First Four Winner'], seed: 16, brand: 'TBD' }
      },
      { 
        game: 'Louisville (8) vs. Creighton (9)', 
        balls: 'Adidas vs. Nike', 
        recommendation: 'UNDER', 
        type: 'Total Bet', 
        confidence: 'High',
        team1: { name: 'Louisville', logoUrl: teamLogos['Louisville'], seed: 8, brand: 'Adidas' },
        team2: { name: 'Creighton', logoUrl: teamLogos['Creighton'], seed: 9, brand: 'Nike' }
      },
      { 
        game: 'Michigan (5) vs. UC San Diego (12)', 
        balls: 'Nike vs. Wilson', 
        recommendation: 'UC San Diego', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: 'Michigan', logoUrl: teamLogos['Michigan'], seed: 5, brand: 'Nike' },
        team2: { name: 'UC San Diego', logoUrl: teamLogos['UC San Diego'], seed: 12, brand: 'Wilson' }
      },
      { 
        game: 'Texas A&M (4) vs. Yale (13)', 
        balls: 'Wilson vs. Spalding', 
        recommendation: 'Texas A&M', 
        type: 'Favorite', 
        confidence: 'High',
        team1: { name: 'Texas A&M', logoUrl: teamLogos['Texas A&M'], seed: 4, brand: 'Wilson' },
        team2: { name: 'Yale', logoUrl: teamLogos['Yale'], seed: 13, brand: 'Spalding' }
      },
      { 
        game: 'Ole Miss (6) vs. First Four Winner (11)', 
        balls: 'Nike vs. TBD', 
        recommendation: 'UNDER or TBD', 
        type: 'Total Bet', 
        confidence: 'Medium',
        team1: { name: 'Ole Miss', logoUrl: teamLogos['Ole Miss'], seed: 6, brand: 'Nike' },
        team2: { name: 'SDSU/UNC', logoUrl: teamLogos['SDSU/UNC'], seed: 11, brand: 'TBD' }
      },
      { 
        game: 'Iowa State (3) vs. Lipscomb (14)', 
        balls: 'Nike vs. Wilson', 
        recommendation: 'Lipscomb', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: 'Iowa State', logoUrl: teamLogos['Iowa State'], seed: 3, brand: 'Nike' },
        team2: { name: 'Lipscomb', logoUrl: teamLogos['Lipscomb'], seed: 14, brand: 'Wilson' }
      },
      { 
        game: 'Marquette (7) vs. New Mexico (10)', 
        balls: 'Nike vs. Nike', 
        recommendation: 'UNDER', 
        type: 'Total Bet', 
        confidence: 'High',
        team1: { name: 'Marquette', logoUrl: teamLogos['Marquette'], seed: 7, brand: 'Nike' },
        team2: { name: 'New Mexico', logoUrl: teamLogos['New Mexico'], seed: 10, brand: 'Nike' }
      },
      { 
        game: 'Michigan State (2) vs. Bryant (15)', 
        balls: 'Nike vs. Wilson', 
        recommendation: 'Bryant', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: 'Michigan State', logoUrl: teamLogos['Michigan State'], seed: 2, brand: 'Nike' },
        team2: { name: 'Bryant', logoUrl: teamLogos['Bryant'], seed: 15, brand: 'Wilson' }
      }
    ],
    East: [
      { 
        game: 'UConn (1) vs. Norfolk State (16)', 
        balls: 'Nike vs. Nike', 
        recommendation: 'UNDER', 
        type: 'Total Bet', 
        confidence: 'High',
        team1: { name: 'UConn', logoUrl: teamLogos['UConn'], seed: 1, brand: 'Nike' },
        team2: { name: 'Norfolk State', logoUrl: teamLogos['Norfolk State'], seed: 16, brand: 'Nike' }
      },
      { 
        game: 'Oklahoma (8) vs. Florida (9)', 
        balls: 'Nike vs. Nike', 
        recommendation: 'UNDER', 
        type: 'Total Bet', 
        confidence: 'High',
        team1: { name: 'Oklahoma', logoUrl: teamLogos['Oklahoma'], seed: 8, brand: 'Nike' },
        team2: { name: 'Florida', logoUrl: teamLogos['Florida'], seed: 9, brand: 'Nike' }
      },
      { 
        game: 'Memphis (5) vs. Colorado State (12)', 
        balls: 'Nike vs. Wilson', 
        recommendation: 'Colorado State', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: 'Memphis', logoUrl: teamLogos['Memphis'], seed: 5, brand: 'Nike' },
        team2: { name: 'Colorado State', logoUrl: teamLogos['Colorado State'], seed: 12, brand: 'Wilson' }
      },
      { 
        game: 'Maryland (4) vs. Grand Canyon (13)', 
        balls: 'Wilson vs. Nike', 
        recommendation: 'Maryland', 
        type: 'Favorite', 
        confidence: 'High',
        team1: { name: 'Maryland', logoUrl: teamLogos['Maryland'], seed: 4, brand: 'Wilson' },
        team2: { name: 'Grand Canyon', logoUrl: teamLogos['Grand Canyon'], seed: 13, brand: 'Nike' }
      },
      { 
        game: 'Missouri (6) vs. Drake (11)', 
        balls: 'Nike vs. Wilson', 
        recommendation: 'Drake', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: 'Missouri', logoUrl: teamLogos['Missouri'], seed: 6, brand: 'Nike' },
        team2: { name: 'Drake', logoUrl: teamLogos['Drake'], seed: 11, brand: 'Wilson' }
      },
      { 
        game: 'Texas Tech (3) vs. UNC Wilmington (14)', 
        balls: 'Wilson vs. Wilson', 
        recommendation: 'OVER', 
        type: 'Total Bet', 
        confidence: 'High',
        team1: { name: 'Texas Tech', logoUrl: teamLogos['Texas Tech'], seed: 3, brand: 'Wilson' },
        team2: { name: 'UNC Wilmington', logoUrl: teamLogos['UNC Wilmington'], seed: 14, brand: 'Wilson' }
      },
      { 
        game: 'Kansas (7) vs. Arkansas (10)', 
        balls: 'Wilson vs. Nike', 
        recommendation: 'Kansas', 
        type: 'Favorite', 
        confidence: 'High',
        team1: { name: 'Kansas', logoUrl: teamLogos['Kansas'], seed: 7, brand: 'Wilson' },
        team2: { name: 'Arkansas', logoUrl: teamLogos['Arkansas'], seed: 10, brand: 'Nike' }
      },
      { 
        game: "St. John's (2) vs. Omaha (15)", 
        balls: 'Nike vs. Wilson', 
        recommendation: 'Omaha', 
        type: 'Upset Alert', 
        confidence: 'High',
        team1: { name: "St. John's", logoUrl: teamLogos["St. John's"], seed: 2, brand: 'Nike' },
        team2: { name: 'Omaha', logoUrl: teamLogos['Omaha'], seed: 15, brand: 'Wilson' }
      }
    ],
    West: [
      { game: 'Houston (1) vs. SIU Edwardsville (16)', balls: 'Nike vs. Wilson', recommendation: 'SIU Edwardsville', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Houston', logoUrl: teamLogos['Houston'], seed: 1, brand: 'Nike' },
        team2: { name: 'SIU Edwardsville', logoUrl: teamLogos['SIU Edwardsville'], seed: 16, brand: 'Wilson' }
      },
      { game: 'Gonzaga (8) vs. Georgia (9)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High',
        team1: { name: 'Gonzaga', logoUrl: teamLogos['Gonzaga'], seed: 8, brand: 'Nike' },
        team2: { name: 'Georgia', logoUrl: teamLogos['Georgia'], seed: 9, brand: 'Nike' }
      },
      { game: 'Clemson (5) vs. McNeese (12)', balls: 'Nike vs. Wilson', recommendation: 'McNeese', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Clemson', logoUrl: teamLogos['Clemson'], seed: 5, brand: 'Nike' },
        team2: { name: 'McNeese', logoUrl: teamLogos['McNeese'], seed: 12, brand: 'Wilson' }
      },
      { game: 'Purdue (4) vs. High Point (13)', balls: 'Wilson vs. Spalding', recommendation: 'Purdue', type: 'Favorite', confidence: 'High',
        team1: { name: 'Purdue', logoUrl: teamLogos['Purdue'], seed: 4, brand: 'Wilson' },
        team2: { name: 'High Point', logoUrl: teamLogos['High Point'], seed: 13, brand: 'Spalding' }
      },
      { game: 'Illinois (6) vs. First Four Winner (11)', balls: 'Nike vs. TBD', recommendation: 'UNDER or TBD', type: 'Total Bet', confidence: 'Medium',
        team1: { name: 'Illinois', logoUrl: teamLogos['Illinois'], seed: 6, brand: 'Nike' },
        team2: { name: 'First Four Winner', logoUrl: teamLogos['First Four Winner'], seed: 11, brand: 'TBD' }
      },
      { game: 'Kentucky (3) vs. Troy (14)', balls: 'Nike vs. Wilson', recommendation: 'Troy', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Kentucky', logoUrl: teamLogos['Kentucky'], seed: 3, brand: 'Nike' },
        team2: { name: 'Troy', logoUrl: teamLogos['Troy'], seed: 14, brand: 'Wilson' }
      },
      { game: 'Utah State (7) vs. UCLA (10)', balls: 'Spalding vs. Wilson', recommendation: 'UCLA', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Utah State', logoUrl: teamLogos['Utah State'], seed: 7, brand: 'Spalding' },
        team2: { name: 'UCLA', logoUrl: teamLogos['UCLA'], seed: 10, brand: 'Wilson' }
      },
      { game: 'Tennessee (2) vs. Wofford (15)', balls: 'Nike vs. Wilson', recommendation: 'Wofford', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Tennessee', logoUrl: teamLogos['Tennessee'], seed: 2, brand: 'Nike' },
        team2: { name: 'Wofford', logoUrl: teamLogos['Wofford'], seed: 15, brand: 'Wilson' }
      }
    ],
    Midwest: [
      { game: 'Duke (1) vs. First Four Winner (16)', balls: 'Nike vs. TBD', recommendation: 'UNDER or TBD', type: 'Total Bet', confidence: 'Medium',
        team1: { name: 'Duke', logoUrl: teamLogos['Duke'], seed: 1, brand: 'Nike' },
        team2: { name: 'First Four Winner', logoUrl: teamLogos['First Four Winner'], seed: 16, brand: 'TBD' }
      },
      { game: 'Mississippi State (8) vs. Baylor (9)', balls: 'Wilson vs. Nike', recommendation: 'Mississippi State', type: 'Favorite', confidence: 'High',
        team1: { name: 'Mississippi State', logoUrl: teamLogos['Mississippi State'], seed: 8, brand: 'Wilson' },
        team2: { name: 'Baylor', logoUrl: teamLogos['Baylor'], seed: 9, brand: 'Nike' }
      },
      { game: 'Oregon (5) vs. Liberty (12)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High',
        team1: { name: 'Oregon', logoUrl: teamLogos['Oregon'], seed: 5, brand: 'Nike' },
        team2: { name: 'Liberty', logoUrl: teamLogos['Liberty'], seed: 12, brand: 'Nike' }
      },
      { game: 'Arizona (4) vs. Akron (13)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High',
        team1: { name: 'Arizona', logoUrl: teamLogos['Arizona'], seed: 4, brand: 'Nike' },
        team2: { name: 'Akron', logoUrl: teamLogos['Akron'], seed: 13, brand: 'Nike' }
      },
      { game: 'BYU (6) vs. VCU (11)', balls: 'Nike vs. Nike', recommendation: 'UNDER', type: 'Total Bet', confidence: 'High',
        team1: { name: 'BYU', logoUrl: teamLogos['BYU'], seed: 6, brand: 'Nike' },
        team2: { name: 'VCU', logoUrl: teamLogos['VCU'], seed: 11, brand: 'Nike' }
      },
      { game: 'Wisconsin (3) vs. Montana (14)', balls: 'Wilson vs. Wilson', recommendation: 'OVER', type: 'Total Bet', confidence: 'High',
        team1: { name: 'Wisconsin', logoUrl: teamLogos['Wisconsin'], seed: 3, brand: 'Wilson' },
        team2: { name: 'Montana', logoUrl: teamLogos['Montana'], seed: 14, brand: 'Wilson' }
      },
      { game: "Saint Mary's (7) vs. Vanderbilt (10)", balls: 'Wilson vs. Nike', recommendation: "Saint Mary's", type: 'Favorite', confidence: 'High',
        team1: { name: "Saint Mary's", logoUrl: teamLogos["Saint Mary's"], seed: 7, brand: 'Wilson' },
        team2: { name: 'Vanderbilt', logoUrl: teamLogos['Vanderbilt'], seed: 10, brand: 'Nike' }
      },
      { game: 'Alabama (2) vs. Robert Morris (15)', balls: 'Nike vs. Wilson', recommendation: 'Robert Morris', type: 'Upset Alert', confidence: 'High',
        team1: { name: 'Alabama', logoUrl: teamLogos['Alabama'], seed: 2, brand: 'Nike' },
        team2: { name: 'Robert Morris', logoUrl: teamLogos['Robert Morris'], seed: 15, brand: 'Wilson' }
      }
    ]
  };

  const regions: Region[] = ['South', 'East', 'West', 'Midwest'];
  
  // Count recommendations by type for stats display
  const countRecommendations = (): { underdogs: number; overs: number; unders: number } => {
    let underdogs = 0;
    let overs = 0;
    let unders = 0;
    
    regions.forEach(region => {
      bettingData[region].forEach(game => {
        if (game.type === 'Upset Alert') underdogs++;
        if (game.recommendation === 'OVER') overs++;
        if (game.recommendation.includes('UNDER')) unders++;
      });
    });
    
    return { underdogs, overs, unders };
  };
  
  const stats = countRecommendations();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">March Madness Ball Advantage Betting Dashboard</h1>
        <p className="text-gray-600">Recommendations based on the ball advantage theory</p>
        
        <div className="flex justify-center gap-4 mt-6">
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