import { HearingLossRiskProvider } from "@/context/HearingLossRiskContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <HearingLossRiskProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </HearingLossRiskProvider>
    </ChakraProvider>
  );
}
