"use client";

import { ReactNode } from "react";
import { Layout } from "antd";

const { Content } = Layout;

import { Header } from "../Header/Header";
import style from "./mainlayout.module.scss";

export const MainLayout = ({ children }: { children: ReactNode }) => {

  return (
      <Layout className={style.layout}>
        <Header />
        <Content className={style.content}>{children}</Content>
      </Layout>
  );
};
