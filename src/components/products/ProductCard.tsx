import { FC } from "react";
import { Image } from "antd";
import cx from "classnames";

import { fallbackImg } from "src/constants";

interface ProductCardProps {
  title: string;
  creator: string;
  price: number;
  img?: string;
  buyFn: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  title,
  creator,
  price,
  img,
  buyFn,
}) => {
  return (
    <div
      className={cx(
        "cursor-pointer border border-black rounded overflow-hidden",
        "transition-[0.14s] hover:shadow-[4px_4px_0px_0px_black]",
        "hover:translate-x-[-4px] hover:translate-y-[-4px]"
      )}
    >
      <Image
        alt={title}
        src={img}
        width="100%"
        fallback={fallbackImg}
        preview={false}
        className="border-b border-black aspect-square"
      />

      <div className="p-4 space-y-2 aspect-square flex flex-col justify-between">
        <p className="text-black">{title}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-500" />
            <p className="underline text-black">{creator}</p>
          </div>
          <div className="w-min bg-[#ff8fe7] px-2 py-1 text-black border border-black">
            ${price}
          </div>
        </div>
      </div>

      <button
        className={cx(
          "text-center text-black w-full px-4 py-2 bg-[#22a094]",
          "border-t border-black hover:underline"
        )}
        onClick={buyFn}
      >
        Purchase
      </button>
    </div>
  );
};
