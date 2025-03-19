// script/fetch-school-locations.ts
import { PrismaClient } from '@prisma/client';
import { getSearchQuery } from './school-name-mapping';

const prisma = new PrismaClient();
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

/**
 * Fetch location data for a school using Google Places API
 */
async function getSchoolLocation(schoolName: string): Promise<{
  latitude: number;
  longitude: number;
  address: string;
} | null> {
  try {
    // Use our mapping function to get a better search query
    const optimizedQuery = getSearchQuery(schoolName);
    const searchQuery = encodeURIComponent(optimizedQuery);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${GOOGLE_API_KEY}&type=university`;

    console.log(`Searching for: ${optimizedQuery}`);
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
        `No university results found for ${schoolName}, trying general search...`,
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

    console.warn(`No results found for ${schoolName}`);
    return null;
  } catch (error) {
    console.error(
      `Error fetching location for ${schoolName}:`,
      error,
    );
    return null;
  }
}

/**
 * Main function to update the database with school locations
 */
async function updateSchoolLocations() {
  console.log('Starting to fetch and update school locations...');

  try {
    // Get all teams from the database
    const teams = await prisma.team.findMany();
    console.log(`Found ${teams.length} teams in database`);

    // Process each team
    for (const team of teams) {
      console.log(`Processing ${team.name}...`);

      // Skip teams that already have location data
      if (team.latitude && team.longitude && team.location) {
        console.log(
          `${team.name} already has location data. Skipping.`,
        );
        continue;
      }

      // Get location data from Google Places API
      const locationData = await getSchoolLocation(team.name);

      if (locationData) {
        // Update the team record with location data
        await prisma.team.update({
          where: { id: team.id },
          data: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            location: locationData.address,
          },
        });

        console.log(
          `Updated location for ${team.name}: ${locationData.address}`,
        );
      } else {
        console.log(`Could not find location for ${team.name}`);
      }

      // Add a delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log('Finished updating school locations');
  } catch (error) {
    console.error('Error updating school locations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
updateSchoolLocations()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
