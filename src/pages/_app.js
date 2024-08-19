import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Kanit } from "@next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={`${kanit.className}`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
