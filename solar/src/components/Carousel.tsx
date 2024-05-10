import React, { useState } from "react";
import { Box, Flex, Button, Card } from "@chakra-ui/react"; // study relative paths
import NewsComponent from "./carouselNews";
import ImageComponent from "./carouselImage";
import { mockNewsData, mockImageData } from "./carouselMockData";
import { Provider } from "react-redux";

import { store } from "@/app/store/store";
import { NewsContent, ImageContent } from "@/app/utils/types"; // Import types for NewsContent and ImageContent

interface CarouselProps {
  contentType: "news" | "image";
}

const CarouselComponent: React.FC<CarouselProps> = ({ contentType }) => {
  
  const [content, setContent] = useState(() => { // TODO RESOLVE TYPE!!!
      if (contentType === "news") {
      return mockNewsData;
    } else if (contentType === "image") {
      return mockImageData;
    } else {
      return [];
    }
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 3));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(content.length - 3, prevIndex + 3));
  };

  return (
      <Flex direction="column" alignItems="center">
        <Box p="4" width="100%" overflow="hidden">
          <Flex>
            {content
              .slice(currentIndex, currentIndex + 3)
              .map((item, index) => (
                <Card key={index} flex="1 0 33.33%" mx="1" p="4">
                  {/* Type guard to check the type of item */}
                  {contentType === "news" && (
                    <NewsComponent content={item as NewsContent} />
                  )}
                  {contentType === "image" && (
                    <ImageComponent content={{ imageUrl: item as string }} />
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
