"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Layout, Input, ConfigProvider, PaginationProps } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
const { Header, Content } = Layout;
import style from "./main.module.scss";

const theme = {
  token: {
    colorPrimary: "#1d1d1d",
  },
};

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout className={style.layout}>
        <Header className={style.header}>
          <Link href="/">
            <Title className={style.title}>AnimeFlix</Title>
          </Link>
        </Header>

        <Content className={style.content}>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};
