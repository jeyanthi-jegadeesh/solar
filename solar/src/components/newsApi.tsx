import { Box, Card } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addApiNews, NewsApiItem } from '../app/store/newsApiSlice';
import { RootState } from '@/app/store/store';

const NewsApi = () => {
  
  const dispatch = useDispatch();  
  
  useEffect(() => {
    const getData = async () => {
      const apiNews = await fetchData();
      dispatch(addApiNews(apiNews));
    };
    
    getData();
  }, [dispatch]);  

  const newsData = useSelector( (state: RootState) => state.news.news);

  return (
    <Box bg='blue.50' color='blue.900' border='2px' borderColor='blue.900' borderRadius='5' p='5'>
      {newsData.map((item: NewsApiItem) => (
        <Card key={item.id}>
          {item.title}
        </Card>
      ))}
    </Box>
  )
}
    
export default NewsApi;