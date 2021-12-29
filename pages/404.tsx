import { Button, Layout, Result } from "antd";
import React from "react";

interface Page404Props {}

interface Page404State {}

class Page404 extends React.Component<Page404Props, Page404State> {
    state = {};
    render() {
        return (
            <Layout>
                <Layout.Content>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={
                            <Button type="primary" onClick={() => (window.location.hash = "/")}>
                                Back
                            </Button>
                        }
                    />
                </Layout.Content>
            </Layout>
        );
    }
}

export default Page404;
