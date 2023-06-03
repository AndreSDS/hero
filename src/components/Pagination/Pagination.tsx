"use client";

import { useState } from "react";
import { Pagination as PaginationContainer, PaginationProps } from "antd";
import { useAnimeStore } from "@/context/useAnimeStore";
import { AnimesResponse } from "@/interfaces/anime";
import { getAnimesNextPage } from "@/lib/api";
import style from "./pagination.module.scss";

interface PaginationConponentProps {
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
  rest?: PaginationProps;
}

export const PaginationComponent = ({
  currentPage,
  onChange,
  total,
  ...rest
}: PaginationConponentProps) => {
  return (
    <PaginationContainer
      {...rest}
      className={style.pagination}
      onChange={onChange}
      showSizeChanger={false}
      defaultCurrent={1}
      current={currentPage}
      total={total}
    />
  );
};
