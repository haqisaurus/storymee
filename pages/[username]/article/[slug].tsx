import { Avatar, Card, Carousel, Col, Divider, Layout, Row, Typography, Image } from "antd";
import React from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import HeaderNoAuth from "../../../components/HeaderNoAuth";
import { NextRouter, withRouter } from "next/router";
import { getArticleDetail } from "../../../services/post.service";
import htmlParser from "html-react-parser";
import Link from "next/link";
import Head from "next/head";
import moment from "moment";
import Script from "next/script";
interface PostItemProps {
    query: any;
    postDetail: any;
}

interface PostItemState {
    isAuth: any;
}

class PostItem extends React.Component<PostItemProps, PostItemState> {
    state = { postDetail: null as any, isAuth: false, username: "" };
    static async getInitialProps(ctx: any) {
        const res = await getArticleDetail(ctx.query.slug);
        return {
            postDetail: res.data,
            query: ctx.query,
        };
    }

    render() {
        const { postDetail, query } = this.props;
        const { isAuth } = this.state;
        const meta = postDetail?.content.replace(/<[^>]*>?/gm, "").substring(0, 160) + " - " + postDetail?.slug;
        return (
            <>
                <Head>
                    <title>
                        {postDetail?.title} - @{query.username}
                    </title>
                    <meta name="description" content={meta} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Layout>
                    {isAuth ? <HeaderAuth /> : <HeaderNoAuth />}
                    <Layout.Content>
                        <Card className="dashbord-card" style={{ width: "100%", marginBottom: 10 }}>
                            {/* the posting  */}
                            <Typography.Title>{postDetail?.title}</Typography.Title>
                            {postDetail?.images && (
                                <Carousel autoplay>{postDetail?.images.map((image: any) => image && <Image src={image} alt={postDetail?.title + "- @" + query.username} width="100%" />)}</Carousel>
                            )}
                            {htmlParser(postDetail?.content || "")}
                            {/* header posting  */}
                            <Row justify="space-between" style={{ marginBottom: 10 }}>
                                <Col span={20}>
                                    <Row>
                                        <Col flex="55px">
                                            <Avatar size={45} shape="circle" src={postDetail?.creator.photo} />
                                        </Col>
                                        <Col flex="auto">
                                            <Link href={"/"} passHref>
                                                <span style={{ display: "block", fontWeight: 500 }}>{postDetail?.creator.username}</span>
                                            </Link>
                                            <sub
                                                style={{
                                                    fontSize: 10,
                                                    position: "relative",
                                                    bottom: 4,
                                                }}
                                            >
                                                {moment(postDetail?.updatedAt).fromNow()}
                                            </sub>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}></Col>
                            </Row>
                            {/*e: header posting  */}
                            {/* e: the posting  */}
                            <Divider style={{ margin: "7px 0 24px" }} />
                        </Card>
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

export default PostItem;
