import { FC } from "react";
import { Layout } from "antd";

import { CreatorSidebar } from "./CreatorSidebar";

const { Header, Content } = Layout;

interface CreatorPagesLayoutProps extends React.HTMLAttributes<HTMLElement> {
  header: string;
}

export const CreatorPagesLayout: FC<CreatorPagesLayoutProps> = ({
  header,
  children,
}) => {
  return (
    <Layout className="bg-inherit h-screen">
      <CreatorSidebar />
      <Layout>
        <Header className="!bg-inherit py-12 px-[64px]">
          <h1 className="text-3xl">{header}</h1>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
