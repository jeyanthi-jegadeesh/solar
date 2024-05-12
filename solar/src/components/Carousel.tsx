import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Card } from "@chakra-ui/react"; // study relative paths
import NewsComponent from "./carouselNews";
import ImageComponent from "./carouselImage";
import { mockNewsData, mockImageData } from "../app/data/mockData";
import { Provider, useSelector } from "react-redux";
import { NewsApiItem } from '../app/store/newsApiSlice';
import { store } from "@/app/store/store";
import { NewsContent, ImageContent } from "@/app/utils/types"; // Import types for NewsContent and ImageContent
import { RootState } from "../app/store/store";

interface CarouselProps {
  contentType: "news" | "image";
}

const CarouselComponent: React.FC<CarouselProps> = ({ contentType }) => {
  const newsData = useSelector( (state: RootState) => state.news.news);
  // const [content, setContent] = useState<(NewsApiItem[] | ImageContent)[]>(() => {
  //   if (contentType === "news") {
  //     return newsData;
  //   } else if (contentType === "image") {
  //     return mockImageData;
  //   } else {
  //     return [];
  //   }
  // });
  const [content, setContent] = useState<(NewsApiItem[] | ImageContent)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    setContent(contentType === "news" ? newsData : mockImageData);
  }, [contentType, newsData]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(content.length - itemsPerPage, prevIndex + itemsPerPage));
  };

  return (
  
      <Flex direction="column" alignItems="center">
        <Box p="4" width="100%" overflow="hidden">
          <Flex>
            {content
              .slice(currentIndex, currentIndex + 3)
              .map((item, index) => (
                <Card key={index} flex="1 0 33.33%" mx="1" p="4">
                  {contentType === "news" ? (
                    <NewsComponent content={item} />
                      ) : (
                    <ImageComponent content={{ imageUrl: item }} />
                  )}
                </Card>
              ))}
          </Flex>
        </Box>
        <Flex justifyContent="center" mt={4}>
          <Button onClick={goToPrevious} disabled={currentIndex === 0}>
            Previous
          </Button>
          <Button
            onClick={goToNext}
            ml={4}
            disabled={currentIndex >= content.length - 3}
          >
            Next
          </Button>
        </Flex>
      </Flex>
  );
};

export default CarouselComponent;