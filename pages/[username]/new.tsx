import { Button, Col, Form, Input, Layout, List, message, Row, Typography } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import HeaderAuth from "../../components/HeaderAuth";

import { postArticle } from "../../services/post.service";
import { AxiosResponse } from "axios";
import Editor from "../../components/Editor";
import Router, { NextRouter, withRouter } from "next/router";
interface NewProps {
    query: any;
}

interface NewState {}

class New extends React.Component<NewProps, NewState> {
    state = {
        formData: {
            title: "",
            content: "",
            privilage: "ONLY_FOLLOWER",
            type: "",
            images: "",
            hashTags: [] as any[],
            coordinate: null as any,
            mentions: [] as any[],
            previousID: this.props.query.previousID,
        },
    };
    static async getInitialProps(ctx: any) {
        return {
            query: ctx.query,
        };
    }
    render() {
        return (
            <>
                <Layout>
                    <HeaderAuth />
                    <Layout.Content style={{ maxWidth: "100%", margin: "80px  0px auto", padding: 10, height: "calc(100vh - 83px)" }}>
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
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

export default New;
