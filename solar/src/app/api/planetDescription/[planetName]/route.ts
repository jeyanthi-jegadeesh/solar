export const dynamic = 'force-dynamic' // defaults to auto
 

interface WikipediaPage {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
  [key: string]: any; // Allow for other properties that might be included
}

interface WikipediaResponse {
  batchcomplete?: string;
  query: {
    pages: {
      [pageid: string]: WikipediaPage;
    };
  };
}

export async function GET(request: Request, context: any) {
  // // const planet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  // const planet = 'Jupiter';
  const { params } = context;
  const planet = params.planetName
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${planet}&format=json`;
  
  try {
    const response = await fetch(url);
    const jsonData:WikipediaResponse = await response.json();
    const page = Object.values(jsonData.query.pages)[0]; // Obtiene el primer (y en este caso único) objeto de la propiedad "pages"
    const extract = page.extract; // Obtiene el extracto de la página

    return new Response(extract, {
    status: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
  }
}

