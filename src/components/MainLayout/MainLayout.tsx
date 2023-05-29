"use client";

import { ReactNode } from "react";
import { queryClient, QueryClientProvider } from "@/lib/queryClient";
import { ConfigProvider, Layout, Typography } from "antd";

import style from "./mainlayout.module.scss";
import { useAnimeStore } from "@/context/useAnimeStore";
import { AnimesResponse } from "@/interfaces/anime";
import { SearchBar } from "../SearchBar/SearchBar";

const { Title } = Typography;
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
      <QueryClientProvider client={queryClient}>
        <Layout className={style.layout}>
          <Header className={style.header}>
            <div className={style.navbar}>
              <Title className={style.title}>AnimaTrix</Title>
              <div className={style.searchContainer}>
                {animeName && <span onClick={handleClear}>Limpar Filtro</span>}

                <SearchBar />
              </div>
            </div>
          </Header>

          <Content className={style.content}>{children}</Content>
        </Layout>
      </QueryClientProvider>
    </ConfigProvider>
  );
};