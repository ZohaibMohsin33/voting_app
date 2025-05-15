import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { getContract } from "../utils/contract";
import { useEthereum } from "../context/EthereumContext";

const Home = () => {
  const { account } = useEthereum();
  const [contests, setContests] = useState([]);
  const toast = useToast();

  const fetchContests = async () => {
    try {
      const contract = await getContract();
      const count = await contract.getContestsCount();
      const tempContests = [];

      for (let i = 0; i < count; i++) {
        const isActive = await contract.isContestActive(i);
        if (isActive) {
          const [names, votes] = await contract.getChoices(i);
          tempContests.push({ index: i, names, votes });
        }
      }

      setContests(tempContests);
    } catch (err) {
      console.error("Error fetching contests:", err);
    }
  };

  const vote = async (contestIndex, choiceIndex) => {
    try {
      const contract = await getContract(true); // pass 'true' for signer
      const tx = await contract.vote(contestIndex, choiceIndex);
      await tx.wait();
      toast({
        title: "Vote cast successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchContests(); // refresh data after voting
    } catch (error) {
      console.error("Voting error:", error);
      toast({
        title: "Error voting",
        description: error.reason || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (account) {
      fetchContests();
    }
  }, [account]);

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        <Heading>Ongoing Contests</Heading>
        {!account && <Text>Please connect your wallet to see ongoing contests.</Text>}
        {account && contests.length === 0 && (
          <Text>No active contests available right now.</Text>
        )}
        {account &&
          contests.map((contest) => (
            <Box key={contest.index} p={4} borderWidth={1} borderRadius="lg">
              <Heading size="md">Contest #{contest.index}</Heading>
              <Divider my={2} />
              <VStack spacing={3} align="stretch">
                {contest.names.map((name, idx) => (
                  <HStack key={idx} justifyContent="space-between">
                    <Text>{name}</Text>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => vote(contest.index, idx)}
                    >
                      Vote
                    </Button>
                  </HStack>
                ))}
              </VStack>
            </Box>
          ))}
      </VStack>
    </Layout>
  );
};

export default Home;
