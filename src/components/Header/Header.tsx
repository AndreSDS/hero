"use client";

import { Layout, Typography } from "antd";

import { SearchBar } from "../SearchBar/SearchBar";
import style from "./header.module.scss";

const { Title } = Typography;
const { Header: HeaderContainer } = Layout;

export const Header = () => {
  return (
    <HeaderContainer className={style.header}>
      <div className={style.navbar}>
        <Title className={style.title}>AnimeTrix</Title>
        <SearchBar />
      </div>
    </HeaderContainer>
  );
};
