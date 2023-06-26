import { FC } from "react";
import { Layout } from "antd";
import cx from "classnames";

import { CreatorSidebar } from "./CreatorSidebar";

const { Header, Content } = Layout;

interface CreatorPagesLayoutProps extends React.HTMLAttributes<HTMLElement> {
  header: string;
  headerButton?: {
    text: string;
    onClickFn: () => void;
  };
}

export const CreatorPagesLayout: FC<CreatorPagesLayoutProps> = ({
  header,
  headerButton,
  children,
}) => {
  return (
    <Layout className="bg-inherit h-screen">
      <CreatorSidebar />
      <Layout className="overflow-y-scroll">
        <Header
          className={cx(
            "!bg-inherit py-12 px-[64px] border-b border-black h-auto",
            "flex justify-between items-center"
          )}
        >
          <h1 className="text-4xl">{header}</h1>
          {headerButton && (
            <button
              onClick={headerButton.onClickFn}
              className="px-4 border border-black rounded bg-pink_primary"
            >
              <p className="h-[40px] flex items-center">{headerButton.text}</p>
            </button>
          )}
        </Header>
        <Content>
          <div className="p-[64px]">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
