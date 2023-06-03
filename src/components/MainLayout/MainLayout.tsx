"use client";

import { ReactNode } from "react";
import { ConfigProvider, Layout } from "antd";

const { Content } = Layout;

import { Header } from "../Header/Header";
import style from "./mainlayout.module.scss";

const theme = {
  token: {
    colorPrimary: "#1d1d1d",
  },
};

export const MainLayout = ({ children }: { children: ReactNode }) => {

  return (
    <ConfigProvider theme={theme}>
      <Layout className={style.layout}>
        <Header />
        <Content className={style.content}>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};
