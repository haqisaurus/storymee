import "../styles/globals.less";
import "../styles/antd.less";
import type { AppProps } from "next/app";
import { BehaviorSubject } from "rxjs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return <Component {...pageProps} router={router} />;
}

export default MyApp;
