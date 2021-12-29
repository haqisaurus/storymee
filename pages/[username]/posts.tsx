import { Avatar, Button, Card, Image, Layout, List, Space } from "antd";
import moment from "moment";
import React from "react";
import HeaderAuth from "../../components/HeaderAuth";
import { getMyArticles } from "../../services/post.service";
import htmlParser from "html-react-parser";
import { EditFilled, LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import { withRouter } from "next/router";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface PostsProps {
    router: any;
    query: any;
}

interface PostsState {
    dataList: any[];
    pagination: any;
}

class Posts extends React.Component<PostsProps, PostsState> {
    state = {
        dataList: [],
        pagination: {
            page: 1,
            total: 0,
        },
    };
    static async getInitialProps(ctx: any) {
        return {
            query: ctx.query,
        };
    }
    componentDidMount() {
        getMyArticles(this.state.pagination).then((res: any) => {
            this.setState({
                dataList: res.data.content,
            });
        });
    }
    IconText({ icon, text }: any) {
        return (
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        );
    }
    render() {
        const { dataList } = this.state;
        const { username } = this.props.query;
        return (
            <>
                <Layout>
                    <HeaderAuth />
                    <Layout.Content>
                        <List
                            itemLayout="vertical"
                            dataSource={dataList}
                            renderItem={(post: any) => (
                                <Card key={post._id} style={{ marginBottom: 10 }}>
                                    <List.Item
                                        extra={<Button type="text" icon={<EditFilled />} href={"/" + username + "/article/edit/" + post._id} />}
                                        actions={[
                                            <this.IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                            <this.IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                            <this.IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <a href={"/" + username + "/about"}>
                                                    <Avatar src={post.avatar} size={60} />
                                                </a>
                                            }
                                            title={<a href={"/" + username + "/article/" + post.slug}>{post.title}</a>}
                                            description={moment(post.updatedAt).format("LLL")}
                                        />
                                        {post.images?.[0] && <Image src={post.images[0]} alt={post.title} width={"100%"} />}
                                        {htmlParser(post.content)}
                                    </List.Item>
                                </Card>
                            )}
                        />
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

export default withRouter(Posts);
