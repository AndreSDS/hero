"use client";

import { useEffect, useMemo, useState } from "react";
import { Space } from "antd";
import { Anime, AnimesResponse } from "@/interfaces/anime";
import { useAnimeStore } from "@/context/useAnimeStore";
import { getAnimes, getAnimesNextPage } from "@/lib/api";
import { AnimeItem } from "../AnimeItem/AnimeItem";
import { Spinner } from "../Spinner/Spinner";
import { PaginationComponent } from "../Pagination/Pagination";
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
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const count = useMemo(
    () => (animeName ? animesFiltered.count : animeStored.count),
    [animeName, animesFiltered, animeStored]
  );
  const currentAnimes = useMemo(() => {
    if (animeName) {
      return animesFiltered.animes.slice(offset, offset + limit);
    } else {
      return animeStored.animes.slice(offset, offset + limit);
    }
  }, [animeName, animesFiltered, offset, animeStored]);
  const next = useMemo(
    () => (animeName ? animesFiltered.links.next : animeStored.links.next),
    [animeName, animesFiltered, animeStored]
  );

  async function fetchingAnimes() {
    if (animeStored.animes.length > 0) return setLoading(false);

    try {
      const animeResponse: AnimesResponse = await getAnimes();
      setAnimeStored(animeResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function nextPage(page: number) {
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

  const onChange = async (page: number) => {
    setLoading(true);
    if (offset > count) return;

    if (page > currentPage && currentAnimes.length < page * limit) {
      await nextPage(page);
    } else {
      setCurrentPage(page);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingAnimes();
  }, []);

  if (
    loading || currentAnimes.length === 0) {
    return <Spinner />;
  }

  return (
    <Space size="large" className={style.animesList}>
      <div className={style.listContent}>
        {currentAnimes.map((anime: Anime) => (
          <AnimeItem key={anime.id} anime={anime} />
        ))}
      </div>

      <PaginationComponent
        onChange={onChange}
        currentPage={currentPage}
        total={count}
      />
    </Space>
  );
};
