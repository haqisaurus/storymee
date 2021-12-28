import { Avatar, Card, Image, Layout, List, Space } from "antd";
import moment from "moment";
import React from "react";
import HeaderAuth from "../../components/HeaderAuth";
import { getMyArticles } from "../../services/post.service";
import htmlParser from "html-react-parser";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import Item from "antd/lib/list/Item";

interface PostsProps {}

interface PostsState {
    dataList: any[];
    pagination: any;
    username: any;
}

class Posts extends React.Component<PostsProps, PostsState> {
    state = {
        username: "",
        dataList: [],
        pagination: {
            page: 1,
            total: 0,
        },
    };
    componentDidMount() {
        const username = window.localStorage.getItem("username");
        getMyArticles(this.state.pagination).then((res: any) => {
            this.setState({
                dataList: res.data.content,
                username: username,
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
                                        actions={[
                                            <this.IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                            <this.IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                            <this.IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <a href={"/@" + this.state.username + "/about"}>
                                                    <Avatar src={post.avatar} size={60} />
                                                </a>
                                            }
                                            title={<a href={"/@" + this.state.username + "/article/" + post.slug}>{post.title}</a>}
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

export default Posts;
