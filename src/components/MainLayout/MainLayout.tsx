"use client";

import { ReactNode } from "react";
import { ConfigProvider, Layout, Typography } from "antd";

import { SearchBar } from "../SearchBar/SearchBar";
import style from "./mainlayout.module.scss";

const { Title } = Typography;
const { Header, Content } = Layout;

const theme = {
  token: {
    colorPrimary: "#1d1d1d",
  },
};

export const MainLayout = ({ children }: { children: ReactNode }) => {

  return (
    <ConfigProvider theme={theme}>
      <Layout className={style.layout}>
        <Header className={style.header}>
          <div className={style.navbar}>
            <Title className={style.title}>AnimaTrix</Title>
            <SearchBar />
          </div>
        </Header>

        <Content className={style.content}>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};
