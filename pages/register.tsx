import { useRouter } from "next/router";

import { Button, Card, Col, Form, Input, Layout, Modal, Row, Image } from "antd";
import Link from "next/link";
import { MailOutlined, CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { postRegister } from "../services/user.services";
import { Component } from "react";
import { BehaviorSubject } from "rxjs";

import Router from "next/router";
import Avatar from "antd/lib/avatar/avatar";
interface Iprops {
    router: any;
}
interface IState {
    formData: any;
}
class Register extends Component<Iprops, IState> {
    state = {
        formData: {
            username: "",
            email: "",
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
                                            <Image src="/logo.png" preview={false} alt="logo" />
                                            <Formik
                                                initialValues={this.state.formData}
                                                validationSchema={yup.object().shape({
                                                    username: yup.string().required("Username is required"),
                                                    email: yup.string().required("Email is required"),
                                                    password: yup.string().required("Password is required"),
                                                })}
                                                onSubmit={(values, { setSubmitting }) => {
                                                    postRegister(values)
                                                        .then((res: AxiosResponse<any>) => {
                                                            const user: any = localStorage.getItem("user");
                                                            const userSubject: any = new BehaviorSubject(process.browser && JSON.parse(user));
                                                            userSubject.next(res.data);
                                                            localStorage.setItem("user", JSON.stringify(res.data));
                                                            const returnUrl: any = this.props.router.query.returnUrl || "/login";
                                                            Router.push(returnUrl);
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
                                                                placeholder="Username"
                                                                prefix={<MailOutlined style={{ color: "#1F59B6" }} />}
                                                                bordered={false}
                                                                style={{
                                                                    borderBottom: "1px solid #E9E9F0",
                                                                }}
                                                                className="placeholder-blue"
                                                                suffix={<CheckCircleOutlined style={{ color: "grey" }} />}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item validateStatus={errors.email && touched.email ? "error" : ""} help={errors.email && touched.email ? errors.email : null}>
                                                            <Input
                                                                name="email"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="Your@email.com"
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
                                                                REGISTER
                                                            </Button>
                                                        </Form.Item>

                                                        <Row>
                                                            <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
                                                                Have an account?
                                                                <Link href="/login"> Login.</Link>
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

export default Register;
