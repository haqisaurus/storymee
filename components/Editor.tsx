import { Form, message, Row, Col, Input, Typography, List, Button, Skeleton } from "antd";
import { AxiosResponse } from "axios";
import { CKEditor } from "ckeditor4-react";
import { Formik } from "formik";
import React from "react";
import { postArticle } from "../services/post.service";
import * as yup from "yup";

interface EditorProps {
    formData: any;
    setMentions: (x: any) => void;
}

interface EditorState {
    characterInput: string;
}

class Editor extends React.Component<EditorProps, EditorState> {
    state = {
        characterInput: "",
    };

    render() {
        const { formData } = this.props;
        const { characterInput } = this.state;

        return (
            <Form>
                <Formik
                    enableReinitialize
                    initialValues={formData}
                    validationSchema={yup.object().shape({
                        title: yup.string().required("Username is required"),
                        content: yup.string().required("Password is required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        postArticle(values)
                            .then((res: AxiosResponse<any>) => {
                                message.success({
                                    content: "Save post",
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
                                        <Input placeholder="Title" name="title" value={values?.title} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item>
                                        <CKEditor
                                            initData={values?.content}
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
                                        value={characterInput}
                                        onChange={(e: any) => {
                                            this.setState({
                                                characterInput: e.target.value,
                                            });
                                        }}
                                        onPressEnter={(e: any) => {
                                            const chars = [...formData.mentions];
                                            const mention: any = { userId: "", username: e.target.value, photo: "", count: 0 };
                                            chars.push(mention);
                                            this.setState({
                                                characterInput: "",
                                            });
                                            this.props.setMentions(chars);
                                        }}
                                    />
                                    <div style={{ marginTop: 15, marginBottom: 15 }}>
                                        {formData?.mentions.map((item: any) => (
                                            <Button
                                                key={item.username + item.count}
                                                onClick={() => {
                                                    const editor: any = window.CKEDITOR.instances.content;
                                                    // APPEND TEXT
                                                    const id = makeid(30);
                                                    const elementHtml = `<p style="padding-left: 20px; margin-top: 0px; margin-bottom: 0px;"> <strong>${item.username}</strong>: "<span id="${id}" ></span>". </p>`;
                                                    const element = window.CKEDITOR.dom.element.createFromHtml(elementHtml);
                                                    editor?.insertElement(element);

                                                    var range = editor.createRange();
                                                    setTimeout(() => {
                                                        range.setStart(editor.document.getById(id), 0);
                                                        range.setEnd(editor.document.getById(id), 0);
                                                        editor.getSelection().selectRanges([range]);
                                                    }, 50);
                                                    // re-arrange
                                                    const mentions = [...formData.mentions];
                                                    const charIndex = mentions.findIndex((v: any) => v.username === item.username);
                                                    mentions[charIndex].count += 1;
                                                    mentions.push(mentions[charIndex]);
                                                    mentions.splice(charIndex, 1);
                                                    this.props.setMentions(mentions);
                                                }}
                                                style={{ marginRight: 5, marginBottom: 5 }}
                                            >
                                                {item.username}
                                            </Button>
                                        ))}
                                    </div>

                                    <Button block type="primary" onClick={() => handleSubmit()} loading={isSubmitting} disabled={isSubmitting}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Formik>
            </Form>
        );
    }
}

export default Editor;

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
