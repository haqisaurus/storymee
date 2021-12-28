import type { NextPage } from "next";
import { Layout, Menu, Avatar, Button, Card, Col, Comment, Divider, Row, Space, Typography, Input, Tooltip, Dropdown } from "antd";
import Link from "next/link";
import { DislikeFilled, LikeFilled, PlusOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import moment from "moment";
import React from "react";
import HeaderNoAuth from "../components/HeaderNoAuth";
React.useLayoutEffect = React.useEffect;
const { Header, Content, Footer } = Layout;
interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    state = {};
    render() {
        return (
            <Layout>
                <HeaderNoAuth />
                <Content className="site-layout">
                    <div className="site-layout-background">
                        <Card className="dashbord-card" style={{ width: "100%" }}>
                            {/* header posting  */}
                            <Row justify="space-between" style={{ marginBottom: 10 }}>
                                <Col span={20}>
                                    <Row>
                                        <Col flex="55px">
                                            <Avatar size={45} shape="circle" />
                                        </Col>
                                        <Col flex="auto">
                                            <Link href={""}>
                                                <span style={{ display: "block", fontWeight: 500 }}>Nama saya</span>
                                            </Link>
                                            <sub
                                                style={{
                                                    fontSize: 10,
                                                    position: "relative",
                                                    bottom: 4,
                                                }}
                                            >
                                                5 hari laluy
                                            </sub>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}></Col>
                            </Row>
                            {/*e: header posting  */}
                            {/* the posting  */}
                            <Typography.Paragraph style={{ margin: "0 0 10px" }}>
                                <p>
                                    Next.js is a React framework that is used to build fast, high-performance, hybrid static and server side rendering web applications. Ant Design is a UI library that provides
                                    a lot of pre-made React components like Button, DatePicker, DropDown, Drawer, etc, which can help you create beautiful and enterprise-class products.
                                </p>
                                <p>
                                    Tempo hari aku sudah Konsul dengan tim penilai, banyak masukan dari sana. Kemudian aq revisi draft ku, sesuai arahan tim penilai. Sekarang tinggal tanda tangan atasan.
                                    Ternyata masih ada yang harus direvisi lagi. Melelahkan memang proses ini. Persis saat pengajuan karya tulis. Hari ini revisi bagian ini. Besok masih ada bagian lain lagi.
                                    Terus begitu.  Kenapa g dari awal? kalau memang drat itu salah, ya coret-coret saja sekalian. Revisinya juga sekalian. Ini malah satu-satu. 
                                </p>
                                <p>
                                    Aku menarik nafas. Sabar. Sabar. Sabar. Ini ujian. Mau naik kelas harus melalui proses ujian. Ayo semangat. Demi semuanya. Pasti aku bisa. Semangat ku kembali datang.
                                    Kujalani proses ini satu-satu, mulai dari begadang sampai pagi entry data. Kemudian ngedeprok didepan laptop tanpa kenal waktu. Mengabaikan suami dan keluarga. Untung nya
                                    suami support penuh. Sehingga urusan tetek bengek keluarga dia yang atur. Alhamdulillah.  Selanjutnya wira-wiri konsul sana-sini.Sampai terakhir, pontang-panting minta tanda
                                    tangan dan ACC.
                                </p>
                                <p>
                                    " Dek, surat ijin belajar mu kok berbeda. Harusnya ijin belajar saja, kenapa kok bunyinya  berbeda?" Bu Heni ,tim penilai menghubungi ku menyampaikan kalau permasalahan yang
                                    menjadi kendala. Aku menyampaikan bahwa itu sudah sesuai dengan permintaan. Dan surat itu dianggap sama dengan surat ijin belajar.
                                </p>
                                <p>" Gini aja, tolong hubungi kepegawaian saja, solusinya bagaimana!"</p>
                                <p>"Baiklah Bu!" Kembali aku mengiyakan dan berusaha mencari solusi.</p>
                                <p>Padahal kemarin aku sudah tenang, berkas sudah kelar. Pikirku, tinggal terbit surat penetapan. Malah ada lagi. Ah.. harus lebih bersabar lagi. Ini ujian.</p>
                                <p>
                                    Next.js is a React framework that is used to build fast, high-performance, hybrid static and server side rendering web applications. Ant Design is a UI library that provides
                                    a lot of pre-made React components like Button, DatePicker, DropDown, Drawer, etc, which can help you create beautiful and enterprise-class products.
                                </p>
                                <p>
                                    Tempo hari aku sudah Konsul dengan tim penilai, banyak masukan dari sana. Kemudian aq revisi draft ku, sesuai arahan tim penilai. Sekarang tinggal tanda tangan atasan.
                                    Ternyata masih ada yang harus direvisi lagi. Melelahkan memang proses ini. Persis saat pengajuan karya tulis. Hari ini revisi bagian ini. Besok masih ada bagian lain lagi.
                                    Terus begitu.  Kenapa g dari awal? kalau memang drat itu salah, ya coret-coret saja sekalian. Revisinya juga sekalian. Ini malah satu-satu. 
                                </p>
                                <p>
                                    Aku menarik nafas. Sabar. Sabar. Sabar. Ini ujian. Mau naik kelas harus melalui proses ujian. Ayo semangat. Demi semuanya. Pasti aku bisa. Semangat ku kembali datang.
                                    Kujalani proses ini satu-satu, mulai dari begadang sampai pagi entry data. Kemudian ngedeprok didepan laptop tanpa kenal waktu. Mengabaikan suami dan keluarga. Untung nya
                                    suami support penuh. Sehingga urusan tetek bengek keluarga dia yang atur. Alhamdulillah.  Selanjutnya wira-wiri konsul sana-sini.Sampai terakhir, pontang-panting minta tanda
                                    tangan dan ACC.
                                </p>
                            </Typography.Paragraph>
                            {/* e: the posting  */}
                            <Divider style={{ margin: "7px 0 24px" }} />
                            <Comment
                                actions={[
                                    <Tooltip key="comment-basic-like" title="Like">
                                        <span>
                                            <LikeFilled />
                                            <span className="comment-action">2</span>
                                        </span>
                                    </Tooltip>,
                                    <Tooltip key="comment-basic-dislike" title="Dislike">
                                        <span>
                                            <DislikeFilled />
                                            <span className="comment-action">2</span>
                                        </span>
                                    </Tooltip>,
                                    <span key="comment-basic-reply-to">Reply to</span>,
                                ]}
                                author={<a>Han Solo</a>}
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                content={
                                    <p>
                                        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes
                                        beautifully and efficiently.
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default Home;
