import React from "react";
import { BehaviorSubject } from "rxjs";

import Router from "next/router";
import { Avatar, Button, Card, Col, Divider, Layout, Row, Tooltip, Typography } from "antd";
import HeaderAuth from "../../components/HeaderAuth";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import moment from "moment";
import Link from "next/link";
interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    state = {};
    logout() {
        const user: any = localStorage.getItem("user");
        const userSubject: any = new BehaviorSubject(process.browser && JSON.parse(user));
        localStorage.removeItem("user");
        userSubject.next(null);
        Router.push("/login");
    }
    render() {
        return (
            <Layout>
                <HeaderAuth />
                <Layout.Content>
                    {[1, 2, 3, 4, 5].map((item: any, index: any) => (
                        <Card className="dashbord-card" style={{ width: "100%", marginBottom: 10 }} key={index}>
                            {/* header posting  */}
                            <Row justify="space-between" style={{ marginBottom: 10 }}>
                                <Col span={20}>
                                    <Row>
                                        <Col flex="55px">
                                            <Avatar size={45} shape="circle" />
                                        </Col>
                                        <Col flex="auto">
                                            <Link href={""} passHref>
                                                <span style={{ display: "block", fontWeight: 500 }}>Nama saya</span>
                                            </Link>
                                            <sub
                                                style={{
                                                    fontSize: 10,
                                                    position: "relative",
                                                    bottom: 4,
                                                }}
                                            >
                                                5 hari laluy
                                            </sub>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}></Col>
                            </Row>
                            {/*e: header posting  */}
                            {/* the posting  */}
                            <Typography.Paragraph style={{ margin: "0 0 10px" }}>
                                <p>
                                    Next.js is a React framework that is used to build fast, high-performance, hybrid static and server side rendering web applications. Ant Design is a UI library that provides
                                    a lot of pre-made React components like Button, DatePicker, DropDown, Drawer, etc, which can help you create beautiful and enterprise-class products.
                                </p>
                            </Typography.Paragraph>
                            {/* e: the posting  */}
                            <Divider style={{ margin: "7px 0 24px" }} />
                        </Card>
                    ))}
                </Layout.Content>
            </Layout>
        );
    }
}

export default Home;
