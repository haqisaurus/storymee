import type { NextPage } from "next";
import { Layout, Menu, Avatar, Button, Card, Col, Comment, Divider, Row, Space, Typography, Input, Tooltip, Dropdown } from "antd";
import Link from "next/link";
import { DislikeFilled, LikeFilled, PlusOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import moment from "moment";
import React from "react";
React.useLayoutEffect = React.useEffect;
const { Header, Content, Footer } = Layout;
interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    state = {};
    render() {
        return (
            <Layout>
                <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                    <Row justify="space-between">
                        <Col span={12}>
                            <div
                                className="logo"
                                style={{
                                    float: "left",
                                    backgroundImage: `url("/vercel.svg")`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    height: 64,
                                    width: 70,
                                    marginRight: 10,
                                }}
                            ></div>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                                <Menu.Item key="1">Home</Menu.Item>
                                <Menu.SubMenu key="Menu.SubMenu" title="Categories">
                                    <Menu.ItemGroup title="Item 1">
                                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                                    </Menu.ItemGroup>
                                    <Menu.ItemGroup title="Item 2">
                                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                                    </Menu.ItemGroup>
                                </Menu.SubMenu>
                            </Menu>
                        </Col>
                        <Col>
                            <Space>
                                <Input placeholder="Search story..."></Input>
                                <Button type="ghost" icon={<PlusOutlined />} style={{ color: "white" }}>
                                    New
                                </Button>
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                                                    1st menu item
                                                </a>
                                            </Menu.Item>

                                            <Menu.Item disabled>
                                                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                                                    3rd menu item (disabled)
                                                </a>
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item danger>Logout</Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Avatar></Avatar>
                                </Dropdown>
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content className="site-layout">
                    <div className="site-layout-background">
                        <Card className="dashbord-card" style={{ width: "100%" }}>
                            {/* header posting  */}
                            <Row justify="space-between" style={{ marginBottom: 10 }}>
                                <Col span={20}>
                                    <Row>
                                        <Col flex="55px">
                                            <Avatar size={45} shape="circle" />
                                        </Col>
                                        <Col flex="auto">
                                            <Link href={""}>
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
                                Next.js is a React framework that is used to build fast, high-performance, hybrid static and server side rendering web applications. Ant Design is a UI library that provides a
                                lot of pre-made React components like Button, DatePicker, DropDown, Drawer, etc, which can help you create beautiful and enterprise-class products.
                            </Typography.Paragraph>
                            {/* e: the posting  */}
                            <Divider style={{ margin: "7px 0 24px" }} />
                            <Comment
                                actions={[
                                    <Tooltip key="comment-basic-like" title="Like">
                                        <span>
                                            <LikeFilled />
                                            <span className="comment-action">2</span>
                                        </span>
                                    </Tooltip>,
                                    <Tooltip key="comment-basic-dislike" title="Dislike">
                                        <span>
                                            <DislikeFilled />
                                            <span className="comment-action">2</span>
                                        </span>
                                    </Tooltip>,
                                    <span key="comment-basic-reply-to">Reply to</span>,
                                ]}
                                author={<a>Han Solo</a>}
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                content={
                                    <p>
                                        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes
                                        beautifully and efficiently.
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default Home;
