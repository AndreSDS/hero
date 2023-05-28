"use client";

import { useEffect, useState } from "react";
import { Space, Pagination, Spin } from "antd";
import { Anime, AnimesResponse } from "@/interfaces/anime";
import { useAnimeStore } from "@/context/useAnimeStore";
import { getAnimes, getAnimesNextPage } from "@/lib/api";
import { AnimeItem } from "../AnimeItem/AnimeItem";
import style from "./animeslist.module.scss";

export const AnimesList = () => {
  const { animeStore, setAnimeStore } = useAnimeStore();
  const [currentAnimes, setCurrentAnimes] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  const {
    animes,
    links: { next, last },
    count: countAnimes,
  } = animeStore;

  async function fetchingAnimes() {
    const animeResponse: AnimesResponse = await getAnimes();

    setAnimeStore(animeResponse);
    setCurrentAnimes(animeResponse.animes.slice(0, 10));

    setLoading(false);
  }

  async function nextAnimes() {
    setLoading(true);

    const nextUrl = next.split("/anime")[1];

    const animeResponse: AnimesResponse = await getAnimesNextPage(nextUrl);

    setAnimeStore(animeResponse);

    setCurrentAnimes(animeResponse.animes);

    setLoading(false);
  }

  function prevAnimes(page: number) {
    const offset = (page - 1) * limit;

    if (offset === 0) return setCurrentAnimes(animes.slice(0, limit));

    const animesByOffset = animes.slice(offset, offset + limit);

    setCurrentAnimes(animesByOffset);
  }

  const onPaginationChange = async (page: number) => {
    setCurrentPage(page);
    const offset = (page - 1) * limit;

    if (offset < 0 || offset > countAnimes) return;

    if (animes.length < offset + limit) {
      await nextAnimes();
    } else {
      prevAnimes(page);
    }
  };

  useEffect(() => {
    fetchingAnimes();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Space size="large" className={style.animesList}>
      {currentAnimes.map((anime: Anime) => (
        <AnimeItem key={anime.id} anime={anime} />
      ))}

      <Pagination
        className={style.pagination}
        onChange={(page: number) => onPaginationChange(page)}
        showSizeChanger={false}
        defaultCurrent={1}
        current={currentPage}
        total={countAnimes}
      />
    </Space>
  );
};
