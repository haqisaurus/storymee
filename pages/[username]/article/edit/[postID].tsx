import { Layout } from "antd";
import React from "react";
import Editor from "../../../../components/Editor";
import HeaderAuth from "../../../../components/HeaderAuth";
import { getArticleDetailID } from "../../../../services/post.service";

interface EditPostProps {
    query: any;
}

interface EditPostState {
    pageReady: boolean;
    formData: any;
}

class EditPost extends React.Component<EditPostProps, EditPostState> {
    state = {
        pageReady: false,
        formData: {
            id: "",
            title: "",
            content: "",
            privilage: "ONLY_FOLLOWER",
            type: "",
            images: "",
            hashTags: [] as any[],
            coordinate: null as any,
            mentions: [] as any[],
        },
    };
    static async getInitialProps(ctx: any) {
        return {
            query: ctx.query,
        };
    }
    componentDidMount() {
        this.getArticleDetailID(this.props.query.postID);
    }
    getArticleDetailID(id: string) {
        getArticleDetailID(id).then((res: any) => {
            const form = { ...this.state.formData, ...res.data };
            form.id = id;
            this.setState({
                formData: form,
                pageReady: true,
            });
        });
    }
    render() {
        return (
            <Layout>
                <HeaderAuth />
                <Layout.Content style={{ maxWidth: "100%", margin: "80px  0px auto", padding: 10, height: "calc(100vh - 83px)" }}>
                    {this.state.pageReady && (
                        <Editor
                            formData={this.state.formData}
                            setMentions={(x: any) => {
                                this.setState({
                                    formData: {
                                        ...this.state.formData,
                                        mentions: x,
                                    },
                                });
                            }}
                        />
                    )}
                </Layout.Content>
            </Layout>
        );
    }
}

export default EditPost;
