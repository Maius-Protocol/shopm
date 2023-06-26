import { FC } from "react";
import cx from "classnames";
import { IconType } from "react-icons";

interface ProductTypeCardProps {
  name: string;
  description: string;
  isSelected?: boolean;
  Icon: IconType;
  iconColor: string;
  onClick: () => void;
}

export const ProductTypeCard: FC<ProductTypeCardProps> = ({
  name,
  description,
  isSelected,
  Icon,
  iconColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        "border border-black rounded p-4 space-y-2 cursor-pointer",
        "transition-[0.14s] hover:shadow-[4px_4px_0px_0px_black]",
        "hover:translate-x-[-4px] hover:translate-y-[-4px]",
        {
          "shadow-[4px_4px_0px_0px_black] translate-x-[-4px] translate-y-[-4px] bg-white":
            isSelected,
        }
      )}
    >
      <Icon size={40} color={iconColor} />
      <div>
        <h5 className="text-black font-bold">{name}</h5>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
};
