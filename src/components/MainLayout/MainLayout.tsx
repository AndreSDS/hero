"use client";

import { ReactNode } from "react";
import { ConfigProvider, Layout, Typography } from "antd";

import style from "./mainlayout.module.scss";
import { useAnimeStore } from "@/context/useAnimeStore";
import { AnimesResponse } from "@/interfaces/anime";
import { SearchBar } from "../SearchBar/SearchBar";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const theme = {
  token: {
    colorPrimary: "#1d1d1d",
  },
};

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { animeName, setAnimeName, setAnimesFiltered } = useAnimeStore();

  function handleClear() {
    setAnimeName("");

    setAnimesFiltered({} as AnimesResponse);
  }

  return (
    <ConfigProvider theme={theme}>
        <Layout className={style.layout}>
          <Header className={style.header}>
            <div className={style.navbar}>
              <Title className={style.title}>AnimaTrix</Title>
              <div className={style.searchContainer}>
                {animeName && <span className={style.clear} onClick={handleClear}>limpar filtro</span> }

                <SearchBar />
              </div>
            </div>
          </Header>

          <Content className={style.content}>{children}</Content>
        </Layout>
    </ConfigProvider>
  );
};
