import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Input, Menu, Row, Space, Layout } from "antd";
import Link from "next/link";
import Script from "next/script";
import React from "react";
import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import NextHeader from "next/head";
interface HeaderAuthProps {}

interface HeaderAuthState {}

class HeaderAuth extends React.Component<HeaderAuthProps, HeaderAuthState> {
    state = {
        username: "",
    };
    componentDidMount() {
        const username = window.localStorage.getItem("username");
        this.setState({
            username,
        });
    }
    logout() {
        const token: any = localStorage.getItem("token");
        const tokenSubject: any = new BehaviorSubject(process.browser && JSON.parse(token));
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        tokenSubject.next(null);
        Router.push("/login");
    }
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

                                <Input placeholder="Search story..."></Input>
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <Button type="ghost" icon={<PlusOutlined />} style={{ color: "white" }} href={`/@${this.state.username}/new`} rel="noopener noreferrer">
                                    New
                                </Button>
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a rel="noopener noreferrer" href={`/@${this.state.username}/profile`}>
                                                    Profile
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a rel="noopener noreferrer" href={`/@${this.state.username}/preferences`}>
                                                    Settings
                                                </a>
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item>
                                                <a rel="noopener noreferrer" href={`/@${this.state.username}/posts`}>
                                                    My Stories
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item danger onClick={this.logout}>
                                                Logout
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Avatar></Avatar>
                                </Dropdown>
                            </Space>
                        </Col>
                    </Row>
                </Layout.Header>
            </>
        );
    }
}

export default HeaderAuth;
