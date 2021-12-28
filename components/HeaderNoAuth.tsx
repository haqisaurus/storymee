import { PlusOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Space, Input, Button, Dropdown, Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import React from "react";

interface HeaderNoAuthProps {}

interface HeaderNoAuthState {}

class HeaderNoAuth extends React.Component<HeaderNoAuthProps, HeaderNoAuthState> {
    state = {};
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
                </Header>
            </>
        );
    }
}

export default HeaderNoAuth;
