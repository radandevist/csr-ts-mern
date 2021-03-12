import React from "react";
import unicornImage
  from "@images/meritt-thomas-KTYjVDmN4A4-unsplash.jpg";
import { Box, Link } from "@chakra-ui/layout";
import { Text, Image } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <Box>
      <Text fontSize="5xl" color="whatsapp.500">Hey There!!</Text>
      <Text fontSize="lg">
        Just Switched to chakra-ui and react tailwind css!!
      </Text>
      <Link as={ReactLink} to="/form">Show another page</Link>
      <br/><br/>
      <Box maxW="md" maxH="md" overflow="hidden">
        <Image src={unicornImage}/>
      </Box>
    </Box>
  );
};

export default Home;
