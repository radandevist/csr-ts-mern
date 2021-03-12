import React from "react";
import { Link } from "@chakra-ui/layout";
import { Box, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const NameForm = () => {
  return (
    <Box>
      <Text color="tomato">This is supposed to be a form to fill</Text>
      <Link as={ReactLink} to="/">Go Back Home</Link>
    </Box>
  );
};

export default NameForm;
