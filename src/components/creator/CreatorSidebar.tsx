import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import { Layout } from "antd";
import { IconType } from "react-icons";
import { RiHome2Fill, RiArchiveFill, RiSettings4Fill } from "react-icons/ri";

const { Sider } = Layout;

interface SiderItemProps {
  name: string;
  path: string;
  Icon: IconType;
}

export const CreatorSidebar = () => {
  return (
    <Sider className="!bg-black h-full">
      <header className="uppercase py-12 px-6 border-b border-[#f4f4f4]">
        <Link href="/creator" className="text-white hover:text-white text-4xl">
          Shopm
        </Link>
      </header>
      <div>
        <SiderItem name="Home" path="/creator" Icon={RiHome2Fill} />
        <SiderItem
          name="Products"
          path="/creator/products"
          Icon={RiArchiveFill}
        />
        <SiderItem
          name="Settings"
          path="/creator/settings"
          Icon={RiSettings4Fill}
        />
      </div>
    </Sider>
  );
};

const SiderItem: FC<SiderItemProps> = ({ name, path, Icon }) => {
  const router = useRouter();
  return (
    <Link
      href={path}
      className={cx(
        "text-white hover:text-pink_primary px-6 py-4 border-b border-[#f4f4f4]",
        "flex items-center gap-4",
        { "!text-pink_primary": router.pathname === path }
      )}
    >
      <Icon size={25} />
      <span>{name}</span>
    </Link>
  );
};
