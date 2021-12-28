import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Input, Menu, Row, Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import React from "react";

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
    render() {
        return (
            <>
                <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
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
            </>
        );
    }
}

export default HeaderAuth;
