import "@/styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import Script from "next/script";
import { QueryClientProvider, QueryClient } from "react-query";
import { GetUserName } from "@/components/GetUserName";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  type: "dark",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const userData = GetUserName();

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/");
    }, 200);
  };

  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(
      userData?.email?.length > 20
        ? userData.email.slice(0, 22)
        : userData.email
    );
  }, [userData]);

  const isLoginPage = router.pathname === "/login";
  const isSignupPage = router.pathname === "/signup";
  const isHomePage = router.pathname === "/";

  const shouldRenderHeader = !isLoginPage && !isSignupPage && !isHomePage;

  return (
    <>
      <div className="container vh-100">
        {shouldRenderHeader && <Header email={email} logout={logout} />}
        <Head>
          <title>Together</title>
          <meta
            name="description"
            content="A social media platform to share thoughts and content, with a
              global chat feature. Made with NEXT!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href="https://cdn-icons-png.flaticon.com/512/9486/9486240.png"
          />
        </Head>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></Script>
        <Script
          src="https://kit.fontawesome.com/5818d7bece.js"
          crossorigin="anonymous"
        ></Script>
        <NextUIProvider theme={darkTheme}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </NextUIProvider>
      </div>
    </>
  );
}
