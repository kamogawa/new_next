import { createGlobalStyle } from "styled-components";
import Header from "../components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
