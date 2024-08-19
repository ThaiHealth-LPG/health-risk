import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Kanit, Sarabun } from "@next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={`${kanit.className} ${sarabun.className}`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
