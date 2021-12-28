import { useRouter } from "next/router";

import { Button, Card, Col, Form, Input, Layout, Modal, Row, Image } from "antd";
import Link from "next/link";
import { MailOutlined, CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { postLogin } from "../services/user.services";
import { Component } from "react";
import { BehaviorSubject } from "rxjs";

import { withRouter, NextRouter } from "next/router";
import Avatar from "antd/lib/avatar/avatar";
interface Iprops {
    router: NextRouter;
}
interface IState {
    formData: any;
}
class Login extends Component<Iprops, IState> {
    state = {
        formData: {
            username: "",
            password: "",
        },
    };
    render() {
        return (
            <Layout className="gradient" style={{ minHeight: "100vh", padding: 15 }}>
                <Layout.Content>
                    <Row align="middle" justify="center" style={{ height: "100%" }}>
                        <Col>
                            <Card style={{ borderRadius: 10, minWidth: 375 }}>
                                <Row>
                                    <Col span={24}>
                                        <Form style={{ textAlign: "center", padding: "10px 30px" }}>
                                            <Image src="/logo.png" preview={false} />
                                            <Formik
                                                initialValues={this.state.formData}
                                                validationSchema={yup.object().shape({
                                                    username: yup.string().required("Username is required"),
                                                    password: yup.string().required("Password is required"),
                                                })}
                                                onSubmit={(values, { setSubmitting }) => {
                                                    postLogin(values)
                                                        .then((res: AxiosResponse<any>) => {
                                                            const token: any = localStorage.getItem("token");
                                                            const tokenSubject: any = new BehaviorSubject(process.browser && token);
                                                            tokenSubject.next(res.data.token);
                                                            localStorage.setItem("token", res.data.token);
                                                            localStorage.setItem("username", values.username);
                                                            const { returnUrl } = this.props.router.query;
                                                            const redirect: any = returnUrl?.indexOf("login") === -1 ? returnUrl : "/@" + values.username;
                                                            this.props.router.push(redirect);
                                                        })
                                                        .catch((error: any) => {
                                                            Modal.error({
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
                                                {({ errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                                                    <>
                                                        <Form.Item validateStatus={errors.username && touched.username ? "error" : ""} help={errors.username && touched.username ? errors.username : null}>
                                                            <Input
                                                                name="username"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="your@email.com"
                                                                prefix={<MailOutlined style={{ color: "#1F59B6" }} />}
                                                                bordered={false}
                                                                style={{
                                                                    borderBottom: "1px solid #E9E9F0",
                                                                }}
                                                                className="placeholder-blue"
                                                                suffix={<CheckCircleOutlined style={{ color: "grey" }} />}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            validateStatus={errors.password && touched.password ? "error" : ""}
                                                            help={errors.password && touched.password ? errors.password : null}
                                                            style={{
                                                                marginBottom: 0,
                                                            }}
                                                        >
                                                            <Input.Password
                                                                name="password"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="********"
                                                                onPressEnter={() => handleSubmit()}
                                                                prefix={<LockOutlined style={{ color: "#1F59B6" }} />}
                                                                bordered={false}
                                                                style={{
                                                                    borderBottom: "1px solid #E9E9F0",
                                                                }}
                                                                className="placeholder-blue"
                                                            />
                                                        </Form.Item>
                                                        <Form.Item style={{ textAlign: "right" }}>
                                                            <Link href="/forgot-password">Forgot Password?</Link>
                                                        </Form.Item>
                                                        <Form.Item>
                                                            <Button loading={isSubmitting} shape="round" type="primary" onClick={() => handleSubmit()}>
                                                                LOGIN
                                                            </Button>
                                                        </Form.Item>

                                                        <Row>
                                                            <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
                                                                Don`t have an account?
                                                                <Link href="/register"> Register Now.</Link>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                )}
                                            </Formik>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }
}

export default withRouter(Login);
