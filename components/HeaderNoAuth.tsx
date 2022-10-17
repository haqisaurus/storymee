import { Row, Col, Space, Input, Button, Layout, Menu, Drawer } from "antd";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function HeaderNoAuth() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
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

            <Layout.Header className="header" style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <Row justify="space-between">
                    <Col xs={20} sm={20} md={20} lg={11}>
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

                            <Input allowClear placeholder="Search..." />
                            <Button type="ghost" style={{ color: "white" }} href="/login">
                                Cari
                            </Button>
                        </Space>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={13} style={{ textAlign: "right" }}>
                        <Space>
                            <Menu
                                mode="horizontal"
                                style={{ width: 200 }}
                                items={[
                                    { label: "Manga", key: "manga-key" }, // remember to pass the key prop
                                    { label: "Story", key: "store-key" }, // which is required
                                ]}
                            />
                            <Button type="ghost" style={{ color: "white" }} href="/login">
                                Login
                            </Button>
                            <Button type="link" style={{ color: "white" }} href="/register">
                                Register
                            </Button>
                        </Space>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={0} style={{ textAlign: "right" }}>
                        <Button type="ghost" icon={<HiMenu style={{ color: "white" }} />} onClick={() => setDrawerOpen(true)}></Button>
                    </Col>
                </Row>
            </Layout.Header>
            <Drawer title="Multi-level drawer" closable={false} onClose={() => setDrawerOpen(false)} open={drawerOpen}>
                asdf
            </Drawer>
        </>
    );
}
