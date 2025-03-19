import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const venues = [
  {
    venue: 'Rupp Arena, Lexington, Kentucky',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Amica Mutual Pavilion, Providence, Rhode Island',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Intrust Bank Arena, Wichita, Kansas',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Ball Arena, Denver, Colorado',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Climate Pledge Arena, Seattle, Washington',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Rocket Arena, Cleveland, Ohio',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Fiserv Forum, Milwaukee, Wisconsin',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Lenovo Center, Raleigh, North Carolina',
    round: 'First/Second Rounds',
    dates: 'March 20-23',
  },
  {
    venue: 'Prudential Center, Newark, NJ',
    round: 'Regional Semifinals and Finals',
    dates: 'March 27-30',
  },
  {
    venue: 'Chase Center, San Francisco, CA',
    round: 'Regional Semifinals and Finals',
    dates: 'March 27-30',
  },
  {
    venue: 'State Farm Arena, Atlanta, GA',
    round: 'Regional Semifinals and Finals',
    dates: 'March 27-30',
  },
  {
    venue: 'Lucas Oil Stadium, Indianapolis, IN',
    round: 'Regional Semifinals and Finals',
    dates: 'March 27-30',
  },
  {
    venue: 'Alamodome, San Antonio, Texas',
    round: 'Final Four',
    dates: 'April 5 and 7, 2025',
  },
];

const GOOGLE_API_KEY = 'AIxxx';

interface PlaceResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address: string;
  name: string;
  place_id: string;
}

async function getArenaLocation(arenaName: string): Promise<{
  latitude: number;
  longitude: number;
  address: string;
} | null> {
  try {
    // Use our mapping function to get a better search query
    const searchQuery = encodeURIComponent(arenaName);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${GOOGLE_API_KEY}`;

    console.log(`Searching for: ${arenaName}`);
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const place: PlaceResult = data.results[0];
      console.log(
        `Found: ${place.name} (${place.formatted_address})`,
      );

      // For debugging - log full result
      // console.log(JSON.stringify(place, null, 2));

      return {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        address: place.formatted_address,
      };
    }

    // If not found with type=university, try without type restriction
    if (data.status === 'ZERO_RESULTS') {
      console.log(
        `No arena results found for ${arenaName}, trying general search...`,
      );
      const fallbackUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${GOOGLE_API_KEY}`;

      const fallbackResponse = await fetch(fallbackUrl);
      const fallbackData = await fallbackResponse.json();

      if (
        fallbackData.status === 'OK' &&
        fallbackData.results.length > 0
      ) {
        const place: PlaceResult = fallbackData.results[0];
        console.log(
          `Found (fallback): ${place.name} (${place.formatted_address})`,
        );

        return {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          address: place.formatted_address,
        };
      }
    }

    console.warn(`No results found for ${arenaName}`);
    return null;
  } catch (error) {
    console.error(`Error fetching location for ${arenaName}:`, error);
    return null;
  }
}

const createLocations = async () => {
  for (const venue of venues) {
    const location = await getArenaLocation(venue.venue);
    if (location) {
      await prisma.location.create({
        data: {
          venue: venue.venue,
          round: venue.round,
          dates: venue.dates,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }
  }
};

createLocations();
