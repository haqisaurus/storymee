import type { NextPage } from "next";
import { Layout, Menu, Avatar, Button, Card, Col, Comment, Divider, Row, Space, Typography, Input, Tooltip, Dropdown } from "antd";
import Link from "next/link";
import { DislikeFilled, LikeFilled, PlusOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import moment from "moment";
import React from "react";
import HeaderNoAuth from "../components/HeaderNoAuth";
import Head from "next/head";
React.useLayoutEffect = React.useEffect;
const { Header, Content, Footer } = Layout;
interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    state = {};
    render() {
        return (
            <>
                <Head>
                    <title>StoryMee - Share your story here</title>
                    <meta name="description" content={"Read the most popular stories on StoryMee, the world's largest social storytelling platform."} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="google-site-verification" content="vRQvkcrCd1m2M35pJSY9oXp3hBTO-82zIcdgRkkOj0g" />
                    {/* <!--    (gtag.js) - Google Analytics --> */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YVZWMB26G0"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'G-YVZWMB26G0');
                            `,
                        }}
                    />
                </Head>
                <Layout>
                    <HeaderNoAuth />
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
                                                <Link href={"/"} passHref>
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
                                        Aku menarik nafas. Sabar. Sabar. Sabar. Ini ujian. Mau naik kelas harus melalui proses ujian. Ayo semangat. Demi semuanya. Pasti aku bisa. Semangat ku kembali datang.
                                        Kujalani proses ini satu-satu, mulai dari begadang sampai pagi entry data. Kemudian ngedeprok didepan laptop tanpa kenal waktu. Mengabaikan suami dan keluarga. Untung nya
                                        suami support penuh. Sehingga urusan tetek bengek keluarga dia yang atur. Alhamdulillah.  Selanjutnya wira-wiri konsul sana-sini.Sampai terakhir, pontang-panting minta
                                        tanda tangan dan ACC.
                                    </p>
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
            </>
        );
    }
}

export default Home;
