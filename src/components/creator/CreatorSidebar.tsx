import { FC } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import { Layout } from "antd";
import { IconType } from "react-icons";
import { RiHome2Fill, RiArchiveFill, RiSettings4Fill } from "react-icons/ri";

const { Sider } = Layout;

interface SiderItemProps {
  name: string;
  url: string;
  Icon: IconType;
}

export const CreatorSidebar = () => {
  return (
    <Sider className="!bg-black h-full">
      <header className="uppercase py-12 px-6 border-b border-[#f4f4f4]">
        <a href="/creator" className="text-white hover:text-white text-3xl">
          Shopm
        </a>
      </header>
      <div>
        <SiderItem name="Home" url="/creator" Icon={RiHome2Fill} />
        <SiderItem
          name="Products"
          url="/creator/products"
          Icon={RiArchiveFill}
        />
        <SiderItem
          name="Settings"
          url="/creator/settings"
          Icon={RiSettings4Fill}
        />
      </div>
    </Sider>
  );
};

const SiderItem: FC<SiderItemProps> = ({ name, url, Icon }) => {
  const router = useRouter();
  return (
    <a
      href={url}
      className={cx(
        "text-white hover:text-[#ff8fe7] px-6 py-4 border-b border-[#f4f4f4]",
        "flex items-center gap-4",
        { "text-[#ff8fe7]": router.pathname === url }
      )}
    >
      <Icon size={25} />
      <span>{name}</span>
    </a>
  );
};
