// utils/school-name-mapping.ts

/**
 * Map school names to more accurate search queries for Google Places API
 * Some school names are common or ambiguous, so we need to specify them better
 */
export const schoolNameMapping: Record<string, string> = {
  // ACC
  Duke: 'Duke University Durham NC',
  Clemson: 'Clemson University South Carolina',
  Louisville: 'University of Louisville Kentucky',
  Florida: 'University of Florida Gainesville',
  Virginia: 'University of Virginia Charlottesville',

  // Big Ten
  Michigan: 'University of Michigan Ann Arbor',
  'Michigan State': 'Michigan State University East Lansing',
  Illinois: 'University of Illinois Urbana-Champaign',
  Wisconsin: 'University of Wisconsin-Madison',
  Purdue: 'Purdue University West Lafayette Indiana',
  Maryland: 'University of Maryland College Park',
  Iowa: 'University of Iowa Iowa City',
  Oregon: 'University of Oregon Eugene',

  // SEC
  Alabama: 'University of Alabama Tuscaloosa',
  Auburn: 'Auburn University Alabama',
  Georgia: 'University of Georgia Athens',
  'Ole Miss': 'University of Mississippi Oxford',
  'Mississippi State': 'Mississippi State University Starkville',
  'Texas A&M': 'Texas A&M University College Station',
  Kentucky: 'University of Kentucky Lexington',
  Tennessee: 'University of Tennessee Knoxville',
  Arkansas: 'University of Arkansas Fayetteville',

  // Big 12
  Kansas: 'University of Kansas Lawrence',
  Baylor: 'Baylor University Waco Texas',
  'Texas Tech': 'Texas Tech University Lubbock',
  'Iowa State': 'Iowa State University Ames',
  Oklahoma: 'University of Oklahoma Norman',

  // Big East
  UConn: 'University of Connecticut Storrs',
  "St. John's": 'St Johns University Queens NY',
  Marquette: 'Marquette University Milwaukee Wisconsin',
  Creighton: 'Creighton University Omaha Nebraska',

  // Smaller schools that might be harder to locate
  Yale: 'Yale University New Haven Connecticut',
  Liberty: 'Liberty University Lynchburg Virginia',
  Montana: 'University of Montana Missoula',
  Drake: 'Drake University Des Moines Iowa',
  'UC San Diego': 'University of California San Diego La Jolla',
  BYU: 'Brigham Young University Provo Utah',
  VCU: 'Virginia Commonwealth University Richmond',
  'Grand Canyon': 'Grand Canyon University Phoenix Arizona',
  "Saint Mary's": "Saint Mary's College Moraga California",
  Lipscomb: 'Lipscomb University Nashville Tennessee',
  McNeese: 'McNeese State University Lake Charles Louisiana',
  'High Point': 'High Point University North Carolina',
  Troy: 'Troy University Alabama',
  'Robert Morris':
    'Robert Morris University Moon Township Pennsylvania',
  'UNC Wilmington': 'UNC Wilmington North Carolina',
  'Norfolk State': 'Norfolk State University Virginia',
  Omaha: 'University of Nebraska Omaha',
  Bryant: 'Bryant University Smithfield Rhode Island',
  'SIU Edwardsville': 'Southern Illinois University Edwardsville',
  Wofford: 'Wofford College Spartanburg South Carolina',
  Akron: 'University of Akron Ohio',
  UCLA: 'UCLA Westwood Los Angeles California',
  Houston: 'University of Houston Texas',
  Gonzaga: 'Gonzaga University Spokane Washington',
  'Utah State': 'Utah State University Logan',
  'New Mexico': 'University of New Mexico Albuquerque',
  'Colorado State': 'Colorado State University Fort Collins',
  Vanderbilt: 'Vanderbilt University Nashville Tennessee',
  Memphis: 'University of Memphis Tennessee',
  Missouri: 'University of Missouri Columbia',
};

/**
 * Get the appropriate search query for a school name
 */
export function getSearchQuery(schoolName: string): string {
  // Return the mapped name if it exists, otherwise return the original name with "university" appended
  return schoolNameMapping[schoolName] || `${schoolName} university`;
}
