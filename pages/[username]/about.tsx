import { Card, Col, Divider, Layout, PageHeader, Row, Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import React from "react";
import HeaderAuth from "../../components/HeaderAuth";

interface ProfileProps {}

interface ProfileState {}

class Profile extends React.Component<ProfileProps, ProfileState> {
    state = {};
    render() {
        return (
            <Layout>
                <HeaderAuth />
                <Layout.Content>
                    <Card style={{ width: "100%", minHeight: "100vh" }}>
                        <Row>
                            <Col span={5}>
                                <Avatar size={100} />
                            </Col>
                            <Col span={19}>
                                <Typography.Title level={4}>Haqi</Typography.Title>
                                <Typography.Text>
                                    Next.js is a React framework that is used to build fast, high-performance, hybrid static and server side rendering web applications. Ant Design is a UI library that provides
                                    a lot of pre-made React components like Button, DatePicker, DropDown, Drawer, etc, which can help you create beautiful and enterprise-class products.
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Divider />
                        <Space>
                            <span>
                                Following: <Link href={""}>23</Link>
                            </span>
                            <Divider />
                            <span>
                                Follower: <Link href={""}>34</Link>
                            </span>
                        </Space>
                    </Card>
                </Layout.Content>
            </Layout>
        );
    }
}

export default Profile;
