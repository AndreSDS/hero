"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "antd";
import { Anime } from "@/interfaces/anime";
import style from "./animeItem.module.scss";

interface AnimeItemProps {
  anime: Anime;
}

export const AnimeItem = ({ anime }: AnimeItemProps) => {
  const { posterImage, canonicalTitle, description, averageRating, status } =
    anime;

  const rating = (Number(averageRating) / 10).toPrecision(2);

  return (
    <Link href={`/animes/${anime.id}`}>
      <Card
        className={style.card}
        bodyStyle={{
          padding: 0,
          overflow: "hidden",
          borderRadius: "0.5rem",
        }}
        bordered={false}
        hoverable
      >
        <div className={style.animeContent}>
          <Image
            src={posterImage.small}
            alt={canonicalTitle}
            width={220}
            height={300}
            priority
          />

          <div className={style.info}>
            <div className={style.tags}>
              <span>⭐ {rating}</span>
            </div>
            <h2>{canonicalTitle}</h2>
          </div>
        </div>
      </Card>
    </Link>
  );
};
