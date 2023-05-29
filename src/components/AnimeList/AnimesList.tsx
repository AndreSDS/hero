"use client";

import { useEffect, useMemo, useState } from "react";
import { Space, Pagination, Spin } from "antd";
import { Anime, AnimesResponse } from "@/interfaces/anime";
import { useAnimeStore } from "@/context/useAnimeStore";
import { getAnimes, getAnimesNextPage } from "@/lib/api";
import { AnimeItem } from "../AnimeItem/AnimeItem";
import style from "./animeslist.module.scss";

export const AnimesList = () => {
  const {
    animeName,
    animeStored,
    animesFiltered,
    setAnimeStored,
    setAnimesFiltered,
  } = useAnimeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const currentAnimes = useMemo(() => {
    if (animeName) {
      return animesFiltered.animes.slice(offset, offset + limit);
    } else {
      return animeStored.animes.slice(offset, offset + limit);
    }
  }, [animeName, animesFiltered, offset, animeStored]);

  async function fetchingAnimes() {
    try {
      const animeResponse: AnimesResponse = await getAnimes();
      setAnimeStored(animeResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function nextAnimes(page: number) {
    const next = animeName ? animesFiltered.links.next : animeStored.links.next;
    const nextUrl = next.split("/edge")[1];

    try {
      const animeResponse: AnimesResponse = await getAnimesNextPage(nextUrl);

      if (animeName) {
        setAnimesFiltered(animeResponse);
      } else {
        setAnimeStored(animeResponse);
      }
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  }

  const onPaginationChange = async (page: number) => {
    setLoading(true);

    const count = animeName ? animesFiltered.count : animeStored.count;

    if (offset < 0 || offset > count) return;

    if (page > currentPage) {
      await nextAnimes(page);
    } else {
      setCurrentPage(page);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (animeName) return;
    fetchingAnimes();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Space size="large" className={style.animesList}>
      <div className={style.listContent}>
        {currentAnimes.map((anime: Anime) => (
          <AnimeItem key={anime.id} anime={anime} />
        ))}
      </div>

      <Pagination
        className={style.pagination}
        onChange={onPaginationChange}
        showSizeChanger={false}
        defaultCurrent={1}
        current={currentPage}
        total={animeName ? animesFiltered.count : animeStored.count}
      />
    </Space>
  );
};
