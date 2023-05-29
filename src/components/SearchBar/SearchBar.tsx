"use client";

import { useState } from "react";
import { Input } from "antd";
import { getAnimeByName } from "@/lib/api";
import { useAnimeStore } from "@/context/useAnimeStore";
import style from "./searchbar.module.scss";

const { Search } = Input;

export const SearchBar = () => {
  const { animeName, setAnimeName, setAnimesFiltered } = useAnimeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  function handleClear() {
    setName("");
    setAnimeName("");

    setAnimesFiltered({
      animes: [],
      links: {
        last: "",
        next: "",
      },
      count: 0,
    });
  }

  async function handleSearch() {
    setIsLoading(true);
    setAnimeName(name);

    const responseFiltered = await getAnimeByName(name);

    if (!responseFiltered.animes) {
      setName("");
      setAnimeName("");
    } else {
      setAnimesFiltered(responseFiltered);
    }

    setIsLoading(false);
  }

  return (
    <div className={style.searchContainer}>
      {animeName && (
        <span className={style.clear} onClick={handleClear}>
          limpar
        </span>
      )}

      <Search
        className={style.search}
        onChange={(e) => setName(e.target.value)}
        value={animeName ? animeName : name}
        onSearch={handleSearch}
        placeholder="Pesquisar por nome..."
        loading={isLoading}
        enterButton
      />
    </div>
  );
};
