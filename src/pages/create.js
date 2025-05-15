import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { getContract } from "../utils/contract";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState(["", ""]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const createContest = async () => {
    try {
      const contract = await getContract();
      await contract.createContest(title, description, choices);
      alert("Contest created successfully!");
      setTitle("");
      setDescription("");
      setChoices(["", ""]);
    } catch (error) {
      console.error(error);
      alert("Failed to create contest.");
    }
  };

  return (
    <Layout>
      <Box maxW="600px" mx="auto">
        <Heading mb={6}>Create New Voting Contest</Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter contest title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter contest description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Choices</FormLabel>
            {choices.map((choice, index) => (
              <Input
                key={index}
                placeholder={`Choice ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                mb={2}
              />
            ))}
            <Button onClick={addChoice} size="sm" colorScheme="gray">
              Add Choice
            </Button>
          </FormControl>

          <Button colorScheme="teal" onClick={createContest}>
            Create Contest
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Create;
