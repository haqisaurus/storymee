import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { getSitemap } from "../services/user.services";
const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response: any = await fetch("http://localhost:8080/api/v1/sitemap");
    const posts = await response.json();

    if (context.res) {
        context.res.setHeader("Content-Type", "text/xml");
        context.res.write(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
            .map((item: any) => {
                return `
                <url>
                    <loc>https://storymee.com${item.url}</loc>
                    <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>
            `;
            })
            .join("")}
        </urlset>`);
        context.res.end();
    }
    return {
        props: {},
    };
};

export default Sitemap;
