import { ChakraProvider } from "@chakra-ui/react";
import { EthereumProvider } from "../context/EthereumContext";
import theme from "../components/theme"; // adjust path if needed

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <EthereumProvider>
        <Component {...pageProps} />
      </EthereumProvider>
    </ChakraProvider>
  );
}

export default MyApp;
