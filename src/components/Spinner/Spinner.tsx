'use client';

import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "white" }} spin />
);

export const Spinner = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Spin indicator={antIcon} size="large" />
    </Space>
  );
};
