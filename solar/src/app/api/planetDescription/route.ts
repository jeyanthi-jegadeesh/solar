export const dynamic = 'force-dynamic' // defaults to auto
 
export async function GET(request: Request) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Venus&format=json';
  
  try {
    const response = await fetch(url);
    console.log(response);
    const jsonData = await response.json();
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