import { FC } from "react";
import { Card } from "antd";

interface CardProps {
  title: string;
  amount?: number;
  isDollar?: boolean;
}

export const ProductsInfoCard: FC<CardProps> = ({
  title,
  amount,
  isDollar = false,
}) => {
  return (
    <Card title={title} className="flex-[1] border-black rounded">
      <h2 className="text-[40px]">
        {amount == null ? "-" : isDollar ? `$${amount}` : amount}
      </h2>
    </Card>
  );
};
