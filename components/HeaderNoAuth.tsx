import { Row, Col, Space, Input, Button, Layout } from "antd";
import Link from "next/link";
import Script from "next/script";
import React from "react";
import NextHeader from "next/head";

interface HeaderNoAuthProps {}

interface HeaderNoAuthState {}

class HeaderNoAuth extends React.Component<HeaderNoAuthProps, HeaderNoAuthState> {
    state = {};
    render() {
        return (
            <>
                <NextHeader>
                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    <Script src="https://www.googletagmanager.com/gtag/js?id=G-YVZWMB26G0" strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', 'G-YVZWMB26G0');
                    `}
                    </Script>
                    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9062353665916694"></Script>
                </NextHeader>
                <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                    <Row justify="space-between">
                        <Col span={12}>
                            <Space>
                                <Link href={"/"} passHref>
                                    <div
                                        className="logo"
                                        style={{
                                            float: "left",
                                            backgroundImage: `url("/logo-white.png")`,
                                            backgroundSize: "contain",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            height: 64,
                                            width: 70,
                                            marginRight: 10,
                                        }}
                                    ></div>
                                </Link>

                                <Input placeholder="Search..." />
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <Button type="ghost" style={{ color: "white" }} href="/login">
                                    Login
                                </Button>
                                <Button type="link" style={{ color: "white" }} href="/register">
                                    Register
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Layout.Header>
            </>
        );
    }
}

export default HeaderNoAuth;
