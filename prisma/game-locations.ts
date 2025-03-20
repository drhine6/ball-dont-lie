import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gameLocations = {
  'First Four': {
    location: 'UD Arena, Dayton, Ohio',
    games: [
      {
        teams: 'TEX/XAV (11) vs. Winner',
        note: 'First Four game',
      },
      {
        teams: 'AMER/MSM (16) vs. Winner',
        note: 'First Four game',
      },
    ],
  },
  'First/Second Rounds': {
    locations: [
      {
        venue: 'Rupp Arena, Lexington, Kentucky',
        games: [
          {
            teams: 'Louisville (8) vs. Creighton (9)',
          },
          {
            teams: 'Kentucky (3) vs. Troy (14)',
          },
        ],
      },
      {
        venue: 'Amica Mutual Pavilion, Providence, Rhode Island',
        games: [
          {
            teams: 'UConn (1) vs. Norfolk State (16)',
          },
          {
            teams: "St. John's (2) vs. Omaha (15)",
          },
        ],
      },
      {
        venue: 'Intrust Bank Arena, Wichita, Kansas',
        games: [
          {
            teams: 'Kansas (7) vs. Arkansas (10)',
          },
          {
            teams: 'Purdue (4) vs. High Point (13)',
          },
        ],
      },
      {
        venue: 'Ball Arena, Denver, Colorado',
        games: [
          {
            teams: 'Texas Tech (3) vs. UNC Wilmington (14)',
          },
          {
            teams: 'Utah State (7) vs. UCLA (10)',
          },
        ],
      },
      {
        venue: 'Climate Pledge Arena, Seattle, Washington',
        games: [
          {
            teams: 'Oregon (5) vs. Liberty (12)',
          },
          {
            teams: 'Arizona (4) vs. Akron (13)',
          },
        ],
      },
      {
        venue: 'Rocket Arena, Cleveland, Ohio',
        games: [
          {
            teams: 'Michigan (5) vs. UC San Diego (12)',
          },
          {
            teams: 'Michigan State (2) vs. Bryant (15)',
          },
        ],
      },
      {
        venue: 'Fiserv Forum, Milwaukee, Wisconsin',
        games: [
          {
            teams: 'Marquette (7) vs. New Mexico (10)',
          },
          {
            teams: 'Wisconsin (3) vs. Montana (14)',
          },
        ],
      },
      {
        venue: 'Lenovo Center, Raleigh, North Carolina',
        games: [
          {
            teams: 'Duke (1) vs. AMER/MSM (16)',
          },
          {
            teams: 'Alabama (2) vs. Robert Morris (15)',
          },
        ],
      },
    ],
  },
  'Regional Semifinals and Finals': {
    locations: [
      {
        venue: 'Prudential Center, Newark, NJ',
        round: 'East Regional (Sweet 16 and Elite Eight)',
        dates: 'March 27-29',
      },
      {
        venue: 'Chase Center, San Francisco, CA',
        round: 'West Regional (Sweet 16 and Elite Eight)',
        dates: 'March 27-29',
      },
      {
        venue: 'State Farm Arena, Atlanta, GA',
        round: 'South Regional (Sweet 16 and Elite Eight)',
        dates: 'March 28-30',
      },
      {
        venue: 'Lucas Oil Stadium, Indianapolis, IN',
        round: 'Midwest Regional (Sweet 16 and Elite Eight)',
        dates: 'March 28-30',
      },
    ],
  },
  'Final Four and National Championship': {
    location: 'Alamodome, San Antonio, Texas',
    dates: 'April 5 and 7, 2025',
  },
};

const gamesWithLocations = [
  {
    game: 'Louisville (8) vs. Creighton (9)',
    region: 'South',
    balls: 'Adidas vs. Nike',
    recommendation: 'UNDER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Louisville',
    team2: 'Creighton',
    location: 'Rupp Arena, Lexington, Kentucky',
    gameTitle: 'Louisville (8) vs. Creighton (9)',
  },
  {
    game: 'Michigan (5) vs. UC San Diego (12)',
    region: 'South',
    balls: 'Nike vs. Wilson',
    recommendation: 'UC San Diego',
    type: 'Upset Alert',
    confidence: 'High',
    team1: 'Michigan',
    team2: 'UC San Diego',
    location: 'Rocket Arena, Cleveland, Ohio',
    gameTitle: 'Michigan (5) vs. UC San Diego (12)',
  },
  {
    game: 'Marquette (7) vs. New Mexico (10)',
    region: 'South',
    balls: 'Nike vs. Nike',
    recommendation: 'UNDER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Marquette',
    team2: 'New Mexico',
    location: 'Fiserv Forum, Milwaukee, Wisconsin',
    gameTitle: 'Marquette (7) vs. New Mexico (10)',
  },
  {
    game: 'Michigan State (2) vs. Bryant (15)',
    region: 'South',
    balls: 'Nike vs. Wilson',
    recommendation: 'Bryant',
    type: 'Upset Alert',
    confidence: 'High',
    team1: 'Michigan State',
    team2: 'Bryant',
    location: 'Rocket Arena, Cleveland, Ohio',
    gameTitle: 'Michigan State (2) vs. Bryant (15)',
  },
  {
    game: 'UConn (1) vs. Norfolk State (16)',
    region: 'East',
    balls: 'Nike vs. Nike',
    recommendation: 'UNDER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'UConn',
    team2: 'Norfolk State',
    location: 'Amica Mutual Pavilion, Providence, Rhode Island',
    gameTitle: 'UConn (1) vs. Norfolk State (16)',
  },
  {
    game: 'Texas Tech (3) vs. UNC Wilmington (14)',
    region: 'East',
    balls: 'Wilson vs. Wilson',
    recommendation: 'OVER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Texas Tech',
    team2: 'UNC Wilmington',
    location: 'Ball Arena, Denver, Colorado',
    gameTitle: 'Texas Tech (3) vs. UNC Wilmington (14)',
  },
  {
    game: 'Kansas (7) vs. Arkansas (10)',
    region: 'East',
    balls: 'Wilson vs. Nike',
    recommendation: 'Kansas',
    type: 'Favorite',
    confidence: 'High',
    team1: 'Kansas',
    team2: 'Arkansas',
    location: 'Intrust Bank Arena, Wichita, Kansas',
    gameTitle: 'Kansas (7) vs. Arkansas (10)',
  },
  {
    game: "St. John's (2) vs. Omaha (15)",
    region: 'East',
    balls: 'Nike vs. Wilson',
    recommendation: 'Omaha',
    type: 'Upset Alert',
    confidence: 'High',
    team1: "St. John's",
    team2: 'Omaha',
    location: 'Amica Mutual Pavilion, Providence, Rhode Island',
    gameTitle: "St. John's (2) vs. Omaha (15)",
  },
  {
    game: 'Purdue (4) vs. High Point (13)',
    region: 'West',
    balls: 'Wilson vs. Spalding',
    recommendation: 'Purdue',
    type: 'Favorite',
    confidence: 'High',
    team1: 'Purdue',
    team2: 'High Point',
    location: 'Intrust Bank Arena, Wichita, Kansas',
    gameTitle: 'Purdue (4) vs. High Point (13)',
  },
  {
    game: 'Kentucky (3) vs. Troy (14)',
    region: 'West',
    balls: 'Nike vs. Wilson',
    recommendation: 'Troy',
    type: 'Upset Alert',
    confidence: 'High',
    team1: 'Kentucky',
    team2: 'Troy',
    location: 'Rupp Arena, Lexington, Kentucky',
    gameTitle: 'Kentucky (3) vs. Troy (14)',
  },
  {
    game: 'Utah State (7) vs. UCLA (10)',
    region: 'West',
    balls: 'Spalding vs. Wilson',
    recommendation: 'UCLA',
    type: 'Upset Alert',
    confidence: 'High',
    team1: 'Utah State',
    team2: 'UCLA',
    location: 'Ball Arena, Denver, Colorado',
    gameTitle: 'Utah State (7) vs. UCLA (10)',
  },
  {
    game: 'Duke (1) vs. AMER/MSM (16)',
    region: 'Midwest',
    balls: 'Nike vs. TBD',
    recommendation: 'UNDER or TBD',
    type: 'Total Bet',
    confidence: 'Medium',
    team1: 'Duke',
    team2: 'AMER/MSM',
    location: 'Lenovo Center, Raleigh, North Carolina',
    gameTitle: 'Duke (1) vs. AMER/MSM (16)',
  },
  {
    game: 'Oregon (5) vs. Liberty (12)',
    region: 'Midwest',
    balls: 'Nike vs. Nike',
    recommendation: 'UNDER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Oregon',
    team2: 'Liberty',
    location: 'Climate Pledge Arena, Seattle, Washington',
    gameTitle: 'Oregon (5) vs. Liberty (12)',
  },
  {
    game: 'Arizona (4) vs. Akron (13)',
    region: 'Midwest',
    balls: 'Nike vs. Nike',
    recommendation: 'UNDER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Arizona',
    team2: 'Akron',
    location: 'Climate Pledge Arena, Seattle, Washington',
    gameTitle: 'Arizona (4) vs. Akron (13)',
  },
  {
    game: 'Wisconsin (3) vs. Montana (14)',
    region: 'Midwest',
    balls: 'Wilson vs. Wilson',
    recommendation: 'OVER',
    type: 'Total Bet',
    confidence: 'High',
    team1: 'Wisconsin',
    team2: 'Montana',
    location: 'Fiserv Forum, Milwaukee, Wisconsin',
    gameTitle: 'Wisconsin (3) vs. Montana (14)',
  },
  {
    game: 'Alabama (2) vs. Robert Morris (15)',
    region: 'Midwest',
    balls: 'Nike vs. Wilson',
    recommendation: 'Robert Morris',
    type: 'Upset Alert',
    confidence: 'High',
    team1: 'Alabama',
    team2: 'Robert Morris',
    location: 'Lenovo Center, Raleigh, North Carolina',
    gameTitle: 'Alabama (2) vs. Robert Morris (15)',
  },
];

// const assignLocationsToGames = async () => {
//   for (const game of gamesWithLocations) {
//     const location = await prisma.location.findFirst({
//       where: {
//         venue: game.location,
//       },
//     });
//     if (location) {
//       await prisma.game.updateMany({
//         where: {
//           gameTitle: game.gameTitle,
//         },
//         data: {
//           locationId: location.id,
//         },
//       });
//     }
//   }
// };

// assignLocationsToGames();
