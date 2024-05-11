// doing fetch from server component
import { useEffect, useState } from "react";

interface ResApi {
  results: any
}

interface NewsApiItem {
  id: number,
  title: string,
  url: string,
  summary: string
}

const NewsServerComponent = () => {
  const[news, setNews] = useState<NewsApiItem[] | null>();
  
  useEffect(() => {
    async function fetchNews() {
      const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/');
      const fetchedNews: ResApi = await res.json();
      const apiResults: NewsApiItem[] = fetchedNews.results;
      console.log(apiResults);
      setNews(apiResults);
    }
    fetchNews()
  },[]);
  
  return null;
}
   
export default NewsServerComponent;