// inserting from server to client component
import React from "react";
import { Text } from "@chakra-ui/react";

interface NewsApiItem {
  id: number,
  title: string,
  url: string,
  summary: string
}

interface Props {
  news: NewsApiItem[] | null;
}

const NewsApiClient: React.FC<Props> = ({data}) => {
  return (
    <div>
      {data ? (
        <div>
            {data.map(item => (
              <div key={item.id}>{item.title}</div>
            ))}
        </div>
      ) : (
        <Text color='white'>No selected news...</Text>
      )}
    </div>
  );
}

export default NewsApiClient;