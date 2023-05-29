"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Button, Space, Layout, Spin } from "antd";
import { Typography } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useAnimeStore } from "@/context/useAnimeStore";
import { gerCharacters, getGenres } from "@/lib/api";
import { Anime } from "@/interfaces/anime";
import style from "./page.module.scss";

const { Title } = Typography;
const { Header, Content } = Layout;

interface AnimeDetailProps {
  params: {
    id: string;
  };
}

export default function AnimeDetail({ params }: AnimeDetailProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [characters, setCharacters] = useState<
    Array<{
      name: string;
      image: string;
    }>
  >([]);
  const { animeStored, animesFiltered, animeName } = useAnimeStore();
  const { id } = params;

  const animesArr = animeName ? animesFiltered.animes : animeStored.animes;
  const anime = animesArr.find((anime) => anime.id === id);

  const fetchingRelations = async () => {
    const charactersArr = await gerCharacters(id);
    const genresArr = await getGenres(id);

    setGenres(genresArr);
    setCharacters(charactersArr);
  };

  const {
    canonicalTitle,
    posterImage,
    description,
    averageRating,
    ageRatingGuide,
    startDate,
    endDate,
    showType,
    episodeCount,
    status,
    youtubeVideoId,
  } = anime || ({} as Anime);

  const rating = (Number(averageRating) / 10).toPrecision(2);

  useEffect(() => {
    fetchingRelations();
  }, []);

  return (
    <Layout
      className={style.container}
      style={{
        backgroundImage: `url(${posterImage?.large})`,
      }}
    >
      <Content className={style.content}>
        {genres.length === 0 || characters.length === 0 || !posterImage ? (
          <Spin size="large" />
        ) : (
          <>
            <Header className={style.headerDetail}>
              <Title className={style.titleDetail}>{canonicalTitle}</Title>
            </Header>

            <div className={style.hero}>
              <div className={style.poster}>
                <Image
                  src={posterImage?.large}
                  alt={canonicalTitle}
                  width={550}
                  height={780}
                />
              </div>

              <Space size="middle" className={style.description}>
                <p>{description}</p>

                <div>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${youtubeVideoId}`
                      )
                    }
                    icon={<PlayCircleOutlined />}
                  >
                    Play
                  </Button>

                  <p>{ageRatingGuide}</p>
                </div>
              </Space>
            </div>

            <Space size="large" className={style.genres}>
              {genres.map((genre: string) => (
                <span className={style.genre} key={genre}>
                  {genre}
                </span>
              ))}

              <div>
                <span>
                  Type: {showType} | Episodes:{" "}
                  {episodeCount ? episodeCount : "N/A"} | ⭐ {rating} |{" "}
                  {startDate} - {endDate} | {status.toUpperCase()}
                </span>
              </div>
            </Space>

            <div className={style.character}>
              <Title className={style.charTitle} level={2}>
                Characters
              </Title>

              <div className={style.characterItem}>
                {characters.map(
                  (char) =>
                    char.image && (
                      <Card
                        key={char.name}
                        bodyStyle={{
                          width: 142,
                          padding: 0,
                          overflow: "hidden",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <Image
                          alt={char.name}
                          src={char.image}
                          width={142}
                          height={180}
                        />
                      </Card>
                    )
                )}
              </div>
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
}
