"use client";

import { useState } from "react";
import { Input } from "antd";
import { getAnimeByName } from "@/lib/api";
import { useAnimeStore } from "@/context/useAnimeStore";
import style from "./searchbar.module.scss";

const { Search } = Input;

export const SearchBar = () => {
  const { setAnimeName, setAnimesFiltered } = useAnimeStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(name: string) {
    setIsLoading(true);
    setAnimeName(name);
    const responseFiltered = await getAnimeByName(name);
    setAnimesFiltered(responseFiltered);
    setIsLoading(false);
  }

  return (
    <Search
      className={style.search}
      onSearch={handleSearch}
      placeholder="Pesquisar por nome..."
      loading={isLoading}
      enterButton
    />
  );
};
