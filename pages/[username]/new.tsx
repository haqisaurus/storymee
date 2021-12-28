import { Button, Col, Form, Input, Layout, List, message, Row, Typography } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import HeaderAuth from "../../components/HeaderAuth";

import { CKEditor } from "ckeditor4-react";
import { postArticle } from "../../services/post.service";
import { AxiosResponse } from "axios";
interface NewProps {}

interface NewState {}

class New extends React.Component<NewProps, NewState> {
    state = {
        characterInput: "",
        formData: {
            title: "",
            content: "",
            privilage: "ONLY_FOLLOWER",
            type: "",
            images: "",
            hashTags: [] as any[],
            coordinate: null as any,
            mentions: [
                {
                    userId: "",
                    username: "Haqi",
                    photo: "",
                },
                {
                    userId: "",
                    username: "Nita",
                    photo: "",
                },
                {
                    userId: "",
                    username: "Surya",
                    photo: "",
                },
                {
                    userId: "",
                    username: "Uman",
                    photo: "",
                },
            ] as any[],
        },
    };
    render() {
        return (
            <>
                <Layout>
                    <HeaderAuth />
                    <Layout.Content style={{ maxWidth: "100%", margin: "80px  0px auto", padding: 10, height: "calc(100vh - 83px)" }}>
                        <Form>
                            <Formik
                                initialValues={this.state.formData}
                                validationSchema={yup.object().shape({
                                    title: yup.string().required("Username is required"),
                                    content: yup.string().required("Password is required"),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    postArticle(values)
                                        .then((res: AxiosResponse<any>) => {
                                            message.success({
                                                content: "Newed",
                                            });
                                        })
                                        .catch((error: any) => {
                                            message.error({
                                                title: `Error`,
                                                // content : error.response.data.message
                                                content: error.response?.data?.message || error.message,
                                            });
                                        })
                                        .finally(() => {
                                            setSubmitting(false);
                                        });
                                }}
                            >
                                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
                                    <>
                                        <Row gutter={15}>
                                            <Col span={18}>
                                                <Form.Item>
                                                    <Input placeholder="Title" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                                </Form.Item>
                                                <Form.Item>
                                                    <CKEditor
                                                        initData={values.content}
                                                        name="content"
                                                        onChange={(event: any) => {
                                                            setFieldValue("content", event.editor.getData());
                                                        }}
                                                        config={{
                                                            height: "500px",
                                                            extraPlugins: "easyimage",
                                                            removePlugins: "image",
                                                            easyimage_styles: {
                                                                full: {
                                                                    // Changes just the class name, the label icon remains unchanged.
                                                                    attributes: {
                                                                        class: "easy-image-class",
                                                                    },
                                                                },
                                                                skipBorder: {
                                                                    attributes: {
                                                                        class: "skip-border",
                                                                    },
                                                                    group: "borders",
                                                                    label: "Skip border",
                                                                    icon: "icons/skip-border.png",
                                                                    iconHiDpi: "icons/skip-border.hidpi.png",
                                                                },
                                                            },
                                                            editorUrl: "https://cdn.ckeditor.com/4.17.1/standard-all/ckeditor.js",
                                                        }}
                                                        onBeforeLoad={(CKEDITOR) => {
                                                            const _this = this;
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Typography.Title level={5}>Characters</Typography.Title>
                                                <Input
                                                    placeholder="New Character"
                                                    value={this.state.characterInput}
                                                    onChange={(e: any) => {
                                                        this.setState({
                                                            characterInput: e.target.value,
                                                        });
                                                    }}
                                                    onPressEnter={(e: any) => {
                                                        const chars = [...this.state.formData.mentions];
                                                        const mention: any = { userId: "", username: e.target.value, photo: "" };
                                                        chars.push(mention);
                                                        this.setState({
                                                            characterInput: "",
                                                            formData: {
                                                                ...this.state.formData,
                                                                mentions: chars,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <List
                                                    size="small"
                                                    dataSource={this.state.formData.mentions}
                                                    renderItem={(item: any, i: number) => (
                                                        <List.Item key={i}>
                                                            <Button
                                                                block
                                                                onClick={() => {
                                                                    const editor: any = window.CKEDITOR.instances.editor1;
                                                                    // APPEND TEXT
                                                                    const id = makeid(30);
                                                                    const elementHtml = `<p style="padding-left: 20px; margin-top: 0px; margin-bottom: 0px;"> <strong>${item.username}</strong>: "<span id="${id}" ></span>". </p>`;
                                                                    const element = window.CKEDITOR.dom.element.createFromHtml(elementHtml);
                                                                    editor.insertElement(element);

                                                                    var range = editor.createRange();
                                                                    setTimeout(() => {
                                                                        range.setStart(editor.document.getById(id), 0);
                                                                        range.setEnd(editor.document.getById(id), 0);
                                                                        editor.getSelection().selectRanges([range]);
                                                                    }, 50);
                                                                }}
                                                            >
                                                                {item.username}
                                                            </Button>
                                                        </List.Item>
                                                    )}
                                                />
                                                <Button block type="primary" onClick={() => handleSubmit()} loading={isSubmitting} disabled={isSubmitting}>
                                                    New
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Formik>
                        </Form>
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

export default New;

declare global {
    interface Window {
        CKEDITOR: any;
    }
}

function makeid(length: number) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
