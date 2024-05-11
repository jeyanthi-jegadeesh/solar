import { Box, Card } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const url = 'https://api.spaceflightnewsapi.net/v4/articles/';

interface NewsApiItem {
    id: number,
    title: string,
    url: string,
    summary: string
  }

const NewsApi: React.FC = () => {
  const [data, setData] = useState<NewsApiItem[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      const extract = jsonData.results;
      setData(extract); // Establece el extracto en el estado
    };
    
    fetchData();
  }, []);  

  return (
    <Box bg='blue.50' color='blue.900' border='2px' borderColor='blue.900' borderRadius='5' p='5'>
      {data.map(item => (
        <Card key={item.id}>
          {item.title}
        </Card>
      ))}
    </Box>
  )
}
    
export default NewsApi;