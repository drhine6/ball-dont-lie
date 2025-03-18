'use client';
import React, { useState } from 'react';

// Define types for our data
type BetType = 'Upset Alert' | 'Favorite' | 'Total Bet';
type Recommendation = string; // Could be a team name, "OVER", "UNDER", etc.
type Region = 'South' | 'East' | 'West' | 'Midwest';

interface TeamInfo {
  name: string;
  logoId: string;
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
  const [darkMode, setDarkMode] = useState(false);

  const getTeamLogoUrl = (id?: string) => {
    const location = darkMode ? '500-dark' : '500';
    if (!id) return '/basketball.svg';
    return `https://a.espncdn.com/i/teamlogos/ncaa/${location}/${id}.png`;
  };

  // Team logo data
  const teamLogoIds: { [key: string]: string } = {
    Auburn: '2',
    Louisville: '97',
    Creighton: '156',
    Michigan: '130',
    'UC San Diego': '28',
    'Texas A&M': '245',
    Yale: '43',
    'Ole Miss': '145',
    'Iowa State': '66',
    Lipscomb: '288',
    Marquette: '269',
    'New Mexico': '167',
    'Michigan State': '127',
    Bryant: '2803',
    UConn: '41',
    'Norfolk State': '2450',
    Oklahoma: '201',
    Florida: '57',
    Memphis: '235',
    'Colorado State': '36',
    Maryland: '120',
    'Grand Canyon': '2253',
    Missouri: '142',
    Drake: '2181',
    'Texas Tech': '2641',
    'UNC Wilmington': '350',
    Kansas: '2305',
    Arkansas: '8',
    "St. John's": '2599',
    Omaha: '2437',
    Duke: '150',
    'Mississippi State': '344',
    Baylor: '239',
    Oregon: '2483',
    Liberty: '2335',
    Arizona: '12',
    Akron: '2006',
    BYU: '252',
    VCU: '2670',
    Wisconsin: '275',
    Montana: '149',
    "Saint Mary's": '2608',
    Vanderbilt: '238',
    Alabama: '333',
    'Robert Morris': '2523',
    Houston: '248',
    'SIU Edwardsville': '2565',
    Gonzaga: '2250',
    Georgia: '61',
    Clemson: '228',
    McNeese: '2377',
    Purdue: '2509',
    'High Point': '2272',
    Illinois: '356',
    Kentucky: '96',
    Troy: '2653',
    UCLA: '26',
    'Utah State': '328',
    Tennessee: '2633',
    Wofford: '2747',
    'First Four Winner': '/basketball.svg',
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
        team1: {
          name: 'Auburn',
          logoId: teamLogoIds['Auburn'],
          seed: 1,
          brand: 'Wilson',
        },
        team2: {
          name: 'First Four Winner',
          logoId: teamLogoIds['First Four Winner'],
          seed: 16,
          brand: 'TBD',
        },
      },
      {
        game: 'Louisville (8) vs. Creighton (9)',
        balls: 'Adidas vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Louisville',
          logoId: teamLogoIds['Louisville'],
          seed: 8,
          brand: 'Adidas',
        },
        team2: {
          name: 'Creighton',
          logoId: teamLogoIds['Creighton'],
          seed: 9,
          brand: 'Nike',
        },
      },
      {
        game: 'Michigan (5) vs. UC San Diego (12)',
        balls: 'Nike vs. Wilson',
        recommendation: 'UC San Diego',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Michigan',
          logoId: teamLogoIds['Michigan'],
          seed: 5,
          brand: 'Nike',
        },
        team2: {
          name: 'UC San Diego',
          logoId: teamLogoIds['UC San Diego'],
          seed: 12,
          brand: 'Wilson',
        },
      },
      {
        game: 'Texas A&M (4) vs. Yale (13)',
        balls: 'Wilson vs. Spalding',
        recommendation: 'Texas A&M',
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: 'Texas A&M',
          logoId: teamLogoIds['Texas A&M'],
          seed: 4,
          brand: 'Wilson',
        },
        team2: {
          name: 'Yale',
          logoId: teamLogoIds['Yale'],
          seed: 13,
          brand: 'Spalding',
        },
      },
      {
        game: 'Ole Miss (6) vs. First Four Winner (11)',
        balls: 'Nike vs. TBD',
        recommendation: 'UNDER or TBD',
        type: 'Total Bet',
        confidence: 'Medium',
        team1: {
          name: 'Ole Miss',
          logoId: teamLogoIds['Ole Miss'],
          seed: 6,
          brand: 'Nike',
        },
        team2: {
          name: 'SDSU/UNC',
          logoId: teamLogoIds['SDSU/UNC'],
          seed: 11,
          brand: 'TBD',
        },
      },
      {
        game: 'Iowa State (3) vs. Lipscomb (14)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Lipscomb',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Iowa State',
          logoId: teamLogoIds['Iowa State'],
          seed: 3,
          brand: 'Nike',
        },
        team2: {
          name: 'Lipscomb',
          logoId: teamLogoIds['Lipscomb'],
          seed: 14,
          brand: 'Wilson',
        },
      },
      {
        game: 'Marquette (7) vs. New Mexico (10)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Marquette',
          logoId: teamLogoIds['Marquette'],
          seed: 7,
          brand: 'Nike',
        },
        team2: {
          name: 'New Mexico',
          logoId: teamLogoIds['New Mexico'],
          seed: 10,
          brand: 'Nike',
        },
      },
      {
        game: 'Michigan State (2) vs. Bryant (15)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Bryant',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Michigan State',
          logoId: teamLogoIds['Michigan State'],
          seed: 2,
          brand: 'Nike',
        },
        team2: {
          name: 'Bryant',
          logoId: teamLogoIds['Bryant'],
          seed: 15,
          brand: 'Wilson',
        },
      },
    ],
    East: [
      {
        game: 'UConn (1) vs. Norfolk State (16)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'UConn',
          logoId: teamLogoIds['UConn'],
          seed: 1,
          brand: 'Nike',
        },
        team2: {
          name: 'Norfolk State',
          logoId: teamLogoIds['Norfolk State'],
          seed: 16,
          brand: 'Nike',
        },
      },
      {
        game: 'Oklahoma (8) vs. Florida (9)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Oklahoma',
          logoId: teamLogoIds['Oklahoma'],
          seed: 8,
          brand: 'Nike',
        },
        team2: {
          name: 'Florida',
          logoId: teamLogoIds['Florida'],
          seed: 9,
          brand: 'Nike',
        },
      },
      {
        game: 'Memphis (5) vs. Colorado State (12)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Colorado State',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Memphis',
          logoId: teamLogoIds['Memphis'],
          seed: 5,
          brand: 'Nike',
        },
        team2: {
          name: 'Colorado State',
          logoId: teamLogoIds['Colorado State'],
          seed: 12,
          brand: 'Wilson',
        },
      },
      {
        game: 'Maryland (4) vs. Grand Canyon (13)',
        balls: 'Wilson vs. Nike',
        recommendation: 'Maryland',
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: 'Maryland',
          logoId: teamLogoIds['Maryland'],
          seed: 4,
          brand: 'Wilson',
        },
        team2: {
          name: 'Grand Canyon',
          logoId: teamLogoIds['Grand Canyon'],
          seed: 13,
          brand: 'Nike',
        },
      },
      {
        game: 'Missouri (6) vs. Drake (11)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Drake',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Missouri',
          logoId: teamLogoIds['Missouri'],
          seed: 6,
          brand: 'Nike',
        },
        team2: {
          name: 'Drake',
          logoId: teamLogoIds['Drake'],
          seed: 11,
          brand: 'Wilson',
        },
      },
      {
        game: 'Texas Tech (3) vs. UNC Wilmington (14)',
        balls: 'Wilson vs. Wilson',
        recommendation: 'OVER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Texas Tech',
          logoId: teamLogoIds['Texas Tech'],
          seed: 3,
          brand: 'Wilson',
        },
        team2: {
          name: 'UNC Wilmington',
          logoId: teamLogoIds['UNC Wilmington'],
          seed: 14,
          brand: 'Wilson',
        },
      },
      {
        game: 'Kansas (7) vs. Arkansas (10)',
        balls: 'Wilson vs. Nike',
        recommendation: 'Kansas',
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: 'Kansas',
          logoId: teamLogoIds['Kansas'],
          seed: 7,
          brand: 'Wilson',
        },
        team2: {
          name: 'Arkansas',
          logoId: teamLogoIds['Arkansas'],
          seed: 10,
          brand: 'Nike',
        },
      },
      {
        game: "St. John's (2) vs. Omaha (15)",
        balls: 'Nike vs. Wilson',
        recommendation: 'Omaha',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: "St. John's",
          logoId: teamLogoIds["St. John's"],
          seed: 2,
          brand: 'Nike',
        },
        team2: {
          name: 'Omaha',
          logoId: teamLogoIds['Omaha'],
          seed: 15,
          brand: 'Wilson',
        },
      },
    ],
    West: [
      {
        game: 'Houston (1) vs. SIU Edwardsville (16)',
        balls: 'Nike vs. Wilson',
        recommendation: 'SIU Edwardsville',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Houston',
          logoId: teamLogoIds['Houston'],
          seed: 1,
          brand: 'Nike',
        },
        team2: {
          name: 'SIU Edwardsville',
          logoId: teamLogoIds['SIU Edwardsville'],
          seed: 16,
          brand: 'Wilson',
        },
      },
      {
        game: 'Gonzaga (8) vs. Georgia (9)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Gonzaga',
          logoId: teamLogoIds['Gonzaga'],
          seed: 8,
          brand: 'Nike',
        },
        team2: {
          name: 'Georgia',
          logoId: teamLogoIds['Georgia'],
          seed: 9,
          brand: 'Nike',
        },
      },
      {
        game: 'Clemson (5) vs. McNeese (12)',
        balls: 'Nike vs. Wilson',
        recommendation: 'McNeese',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Clemson',
          logoId: teamLogoIds['Clemson'],
          seed: 5,
          brand: 'Nike',
        },
        team2: {
          name: 'McNeese',
          logoId: teamLogoIds['McNeese'],
          seed: 12,
          brand: 'Wilson',
        },
      },
      {
        game: 'Purdue (4) vs. High Point (13)',
        balls: 'Wilson vs. Spalding',
        recommendation: 'Purdue',
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: 'Purdue',
          logoId: teamLogoIds['Purdue'],
          seed: 4,
          brand: 'Wilson',
        },
        team2: {
          name: 'High Point',
          logoId: teamLogoIds['High Point'],
          seed: 13,
          brand: 'Spalding',
        },
      },
      {
        game: 'Illinois (6) vs. First Four Winner (11)',
        balls: 'Nike vs. TBD',
        recommendation: 'UNDER or TBD',
        type: 'Total Bet',
        confidence: 'Medium',
        team1: {
          name: 'Illinois',
          logoId: teamLogoIds['Illinois'],
          seed: 6,
          brand: 'Nike',
        },
        team2: {
          name: 'First Four Winner',
          logoId: teamLogoIds['First Four Winner'],
          seed: 11,
          brand: 'TBD',
        },
      },
      {
        game: 'Kentucky (3) vs. Troy (14)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Troy',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Kentucky',
          logoId: teamLogoIds['Kentucky'],
          seed: 3,
          brand: 'Nike',
        },
        team2: {
          name: 'Troy',
          logoId: teamLogoIds['Troy'],
          seed: 14,
          brand: 'Wilson',
        },
      },
      {
        game: 'Utah State (7) vs. UCLA (10)',
        balls: 'Spalding vs. Wilson',
        recommendation: 'UCLA',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Utah State',
          logoId: teamLogoIds['Utah State'],
          seed: 7,
          brand: 'Spalding',
        },
        team2: {
          name: 'UCLA',
          logoId: teamLogoIds['UCLA'],
          seed: 10,
          brand: 'Wilson',
        },
      },
      {
        game: 'Tennessee (2) vs. Wofford (15)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Wofford',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Tennessee',
          logoId: teamLogoIds['Tennessee'],
          seed: 2,
          brand: 'Nike',
        },
        team2: {
          name: 'Wofford',
          logoId: teamLogoIds['Wofford'],
          seed: 15,
          brand: 'Wilson',
        },
      },
    ],
    Midwest: [
      {
        game: 'Duke (1) vs. First Four Winner (16)',
        balls: 'Nike vs. TBD',
        recommendation: 'UNDER or TBD',
        type: 'Total Bet',
        confidence: 'Medium',
        team1: {
          name: 'Duke',
          logoId: teamLogoIds['Duke'],
          seed: 1,
          brand: 'Nike',
        },
        team2: {
          name: 'First Four Winner',
          logoId: teamLogoIds['First Four Winner'],
          seed: 16,
          brand: 'TBD',
        },
      },
      {
        game: 'Mississippi State (8) vs. Baylor (9)',
        balls: 'Wilson vs. Nike',
        recommendation: 'Mississippi State',
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: 'Mississippi State',
          logoId: teamLogoIds['Mississippi State'],
          seed: 8,
          brand: 'Wilson',
        },
        team2: {
          name: 'Baylor',
          logoId: teamLogoIds['Baylor'],
          seed: 9,
          brand: 'Nike',
        },
      },
      {
        game: 'Oregon (5) vs. Liberty (12)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Oregon',
          logoId: teamLogoIds['Oregon'],
          seed: 5,
          brand: 'Nike',
        },
        team2: {
          name: 'Liberty',
          logoId: teamLogoIds['Liberty'],
          seed: 12,
          brand: 'Nike',
        },
      },
      {
        game: 'Arizona (4) vs. Akron (13)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Arizona',
          logoId: teamLogoIds['Arizona'],
          seed: 4,
          brand: 'Nike',
        },
        team2: {
          name: 'Akron',
          logoId: teamLogoIds['Akron'],
          seed: 13,
          brand: 'Nike',
        },
      },
      {
        game: 'BYU (6) vs. VCU (11)',
        balls: 'Nike vs. Nike',
        recommendation: 'UNDER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'BYU',
          logoId: teamLogoIds['BYU'],
          seed: 6,
          brand: 'Nike',
        },
        team2: {
          name: 'VCU',
          logoId: teamLogoIds['VCU'],
          seed: 11,
          brand: 'Nike',
        },
      },
      {
        game: 'Wisconsin (3) vs. Montana (14)',
        balls: 'Wilson vs. Wilson',
        recommendation: 'OVER',
        type: 'Total Bet',
        confidence: 'High',
        team1: {
          name: 'Wisconsin',
          logoId: teamLogoIds['Wisconsin'],
          seed: 3,
          brand: 'Wilson',
        },
        team2: {
          name: 'Montana',
          logoId: teamLogoIds['Montana'],
          seed: 14,
          brand: 'Wilson',
        },
      },
      {
        game: "Saint Mary's (7) vs. Vanderbilt (10)",
        balls: 'Wilson vs. Nike',
        recommendation: "Saint Mary's",
        type: 'Favorite',
        confidence: 'High',
        team1: {
          name: "Saint Mary's",
          logoId: teamLogoIds["Saint Mary's"],
          seed: 7,
          brand: 'Wilson',
        },
        team2: {
          name: 'Vanderbilt',
          logoId: teamLogoIds['Vanderbilt'],
          seed: 10,
          brand: 'Nike',
        },
      },
      {
        game: 'Alabama (2) vs. Robert Morris (15)',
        balls: 'Nike vs. Wilson',
        recommendation: 'Robert Morris',
        type: 'Upset Alert',
        confidence: 'High',
        team1: {
          name: 'Alabama',
          logoId: teamLogoIds['Alabama'],
          seed: 2,
          brand: 'Nike',
        },
        team2: {
          name: 'Robert Morris',
          logoId: teamLogoIds['Robert Morris'],
          seed: 15,
          brand: 'Wilson',
        },
      },
    ],
  };

  const regions: Region[] = ['South', 'East', 'West', 'Midwest'];

  // Count recommendations by type for stats display
  const countRecommendations = (): {
    underdogs: number;
    overs: number;
    unders: number;
  } => {
    let underdogs = 0;
    let overs = 0;
    let unders = 0;

    regions.forEach((region) => {
      bettingData[region].forEach((game) => {
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
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          March Madness Ball Advantage Betting Dashboard
        </h1>
        <p className="text-gray-600">
          Recommendations based on the ball advantage theory
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-red-600">
              {stats.underdogs}
            </div>
            <div className="text-sm text-gray-600">Underdog Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-green-600">
              {stats.overs}
            </div>
            <div className="text-sm text-gray-600">OVER Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-blue-600">
              {stats.unders}
            </div>
            <div className="text-sm text-gray-600">UNDER Bets</div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            className={`px-4 py-2 rounded-lg ${
              activeRegion === region
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600'
            }`}
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
              <tr
                key={index}
                className={
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-center mr-3">
                      <img
                        src={getTeamLogoUrl(game.team1.logoId)}
                        alt={`${game.team1.name} logo`}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-xs text-gray-600">
                        ({game.team1.seed})
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="font-medium">
                        {game.team1.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {game.team1.brand}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center my-2">
                    <div className="border-t border-gray-300 flex-grow mr-2"></div>
                    <span className="text-xs font-medium">VS</span>
                    <div className="border-t border-gray-300 flex-grow ml-2"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-center mr-3">
                      <img
                        src={getTeamLogoUrl(game.team2.logoId)}
                        alt={`${game.team2.name} logo`}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-xs text-gray-600">
                        ({game.team2.seed})
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="font-medium">
                        {game.team2.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {game.team2.brand}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        game.team1.brand === 'Wilson'
                          ? 'text-green-600'
                          : ''
                      }`}
                    >
                      {game.team1.brand}
                    </span>
                    <span className="text-xs my-1">vs</span>
                    <span
                      className={`font-medium ${
                        game.team2.brand === 'Wilson'
                          ? 'text-green-600'
                          : ''
                      }`}
                    >
                      {game.team2.brand}
                    </span>
                  </div>
                </td>
                <td
                  className={`py-3 px-4 font-medium ${
                    game.recommendation.includes('UNDER')
                      ? 'text-blue-600'
                      : game.recommendation.includes('OVER')
                      ? 'text-green-600'
                      : game.type === 'Upset Alert'
                      ? 'text-red-600'
                      : 'text-black'
                  }`}
                >
                  {game.recommendation}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      game.type === 'Upset Alert'
                        ? 'bg-red-100 text-red-800'
                        : game.type === 'Favorite'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {game.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-blue-800 mb-3">
          Ball Advantage Betting Rules
        </h2>
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
            <span className="font-medium">team that uses Wilson</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BettingDashboard;
