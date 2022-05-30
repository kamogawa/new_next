import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Header from "../components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Roboto;
  }
`;

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    throw Error();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
