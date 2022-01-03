import { Form, message, Row, Col, Input, Typography, List, Button, Skeleton, Upload } from "antd";
import axios, { AxiosResponse } from "axios";
import { CKEditor } from "ckeditor4-react";
import { Formik } from "formik";
import React from "react";
import { postArticle } from "../services/post.service";
import * as yup from "yup";
import { PlusOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import { withRouter } from "next/router";
interface EditorProps {
    formData: any;
    setMentions: (x: any) => void;
    router: any;
}

interface EditorState {
    characterInput: string;
    fileList: any[];
}

class Editor extends React.Component<EditorProps, EditorState> {
    state = {
        characterInput: "",
        fileList: [] as any[],
    };

    componentDidMount() {
        const files = this.props.formData?.medias?.map((v: any, i: number) => {
            return {
                uid: i,
                name: "image-" + i,
                status: "done",
                url: v,
            };
        });
        console.log(files);
        this.setState({
            fileList: files,
        });
    }

    render() {
        const { formData } = this.props;
        const { characterInput } = this.state;
        const { username } = this.props.router.query;
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
                        const payload = { ...values };
                        payload.medias = this.state.fileList?.map((v: any) => {
                            if (v.url == null) return v.response.url;
                            return v.url;
                        });
                        postArticle(payload)
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
                                    <Upload
                                        customRequest={async (option: any) => {
                                            const compressed: any = await imageCompression(option.file, {
                                                maxSizeMB: 0.5,
                                                maxWidthOrHeight: 1200,
                                                useWebWorker: true,
                                            });

                                            const metadata = {
                                                name: option.file.name,
                                                mimeType: option.file.type,
                                            };

                                            const form = new FormData();

                                            form.append("file", option.file, option.file.name);
                                            const request = new XMLHttpRequest();
                                            request.open("POST", process.env.NEXT_PUBLIC_API_URL + "/api/v1/media");
                                            const token = localStorage.getItem("token");
                                            request.setRequestHeader("Authorization", "Bearer " + token);
                                            request.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000, https://www.storymee.com");
                                            request.setRequestHeader("Access-Control-Allow-Credentials", "true");
                                            const _this = this;
                                            request.addEventListener("load", function () {
                                                if (request.status === 200) {
                                                    option.onSuccess(request.response);
                                                } else {
                                                    const error = new Error("Some error");
                                                    option.onError({ error });
                                                }
                                            });
                                            request.send(form);
                                        }}
                                        listType="picture-card"
                                        fileList={this.state.fileList}
                                        onChange={(e) => {
                                            this.setState({ fileList: e.fileList });
                                        }}
                                    >
                                        {this.state.fileList?.length >= 8 ? null : (
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>
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
                                                extraPlugins: "uploadimage",
                                                filebrowserUploadUrl: process.env.NEXT_PUBLIC_API_URL + "/api/v1/media",
                                                filebrowserImageUploadUrl: process.env.NEXT_PUBLIC_API_URL + "/api/v1/media",
                                                editorUrl: "https://cdn.ckeditor.com/4.17.1/standard-all/ckeditor.js",
                                            }}
                                            onBeforeLoad={(CKEDITOR) => {
                                                const _this = this;
                                            }}
                                            onInstanceReady={({ editor }) => {
                                                editor.on("fileUploadRequest", function (evt: any) {
                                                    var fileLoader = evt.data.fileLoader,
                                                        formData = new FormData(),
                                                        xhr = fileLoader.xhr;

                                                    xhr.open("POST", fileLoader.uploadUrl, true);
                                                    formData.append("file", fileLoader.file, fileLoader.fileName);
                                                    const token = window.localStorage.getItem("token");

                                                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                                                    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                                                    xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
                                                    fileLoader.xhr.send(formData);
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Link passHref href={"/" + username + "/article/" + values.slug}>
                                        View article
                                    </Link>
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

export default withRouter(Editor);

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
