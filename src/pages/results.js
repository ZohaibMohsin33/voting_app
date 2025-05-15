import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { getContract } from "../utils/contract";

const Results = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const contract = await getContract();
    const count = await contract.getContestsCount();
    const tempResults = [];

    for (let i = 0; i < count; i++) {
      const isActive = await contract.isContestActive(i);
      if (!isActive) {
        const [names, votes] = await contract.getChoices(i);
        tempResults.push({ index: i, names, votes });
      }
    }

    setResults(tempResults);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Layout>
      <Box>
        <Heading mb={6}>Past Voting Results</Heading>
        <VStack spacing={6} align="stretch">
          {results.map((contest, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold" mb={2}>
                Contest #{contest.index}
              </Text>
              <Divider mb={2} />
              {contest.names.map((name, i) => (
                <HStack key={i} justifyContent="space-between">
                  <Text>{name}</Text>
                  <Text>{contest.votes[i].toString()} votes</Text>
                </HStack>
              ))}
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Results;
