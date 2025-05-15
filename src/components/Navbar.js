import React from "react";
import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useEthereum } from "../context/EthereumContext";

const Navbar = () => {
  const { account, connectWallet } = useEthereum();

  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Voting DApp
        </Heading>
        <Spacer />
        <Link href="/">
          <Button colorScheme="teal" variant="ghost" mr={2}>
            Home
          </Button>
        </Link>
        <Link href="/create">
          <Button colorScheme="teal" variant="ghost" mr={2}>
            Create
          </Button>
        </Link>
        <Link href="/results">
          <Button colorScheme="teal" variant="ghost" mr={2}>
            Results
          </Button>
        </Link>
        {account ? (
          <Button colorScheme="teal" variant="solid">
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
        ) : (
          <Button colorScheme="teal" variant="solid" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
