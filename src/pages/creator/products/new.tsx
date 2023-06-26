import { useState } from "react";
import { Input } from "antd";
import {
  RiFolderOpenFill,
  RiPieChartFill,
  RiBook2Fill,
  RiNewspaperFill,
  RiCalendarFill,
  RiMicFill,
  RiHeadphoneFill,
  RiBox3Fill,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

import {
  CreatorPagesLayout,
  ProductTypeCard,
} from "../../../components/creator";

const productTypes = [
  {
    id: "1",
    name: "Digital Product",
    description: "Any set of files to download or stream.",
    Icon: RiFolderOpenFill,
    iconColor: "#ff8fe7",
  },
  {
    id: "2",
    name: "Course or tutorial",
    description: "Sell a single lesson or teach a whole cohort of students.",
    Icon: RiPieChartFill,
    iconColor: "#22a094",
  },
  {
    id: "3",
    name: "E-book",
    description: "Offer a book or comic in PDF, ePub, and Mobi formats.",
    Icon: RiBook2Fill,
    iconColor: "#ffc800",
  },
  {
    id: "4",
    name: "Newsletter",
    description: "Deliver recurring content through email.",
    Icon: RiNewspaperFill,
    iconColor: "#7689c0",
  },
  {
    id: "5",
    name: "Membership",
    description: "Start a membership business around your fans.",
    Icon: RiCalendarFill,
    iconColor: "#f1f332",
  },
  {
    id: "6",
    name: "Podcast",
    description: "Make episodes available for streaming and direct downloads.",
    Icon: RiMicFill,
    iconColor: "#ff7151",
  },
  {
    id: "7",
    name: "Audiobook",
    description: "Let customers listen to your audio content.",
    Icon: RiHeadphoneFill,
    iconColor: "#b13486",
  },
  {
    id: "8",
    name: "Physical good",
    description: "Sell anything that requires shipping something.",
    Icon: RiBox3Fill,
    iconColor: "#ffc800",
  },
];

const CreatorNewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [typeId, setTypeId] = useState<string | undefined>();

  const handleAddProduct = () => {
    console.log({ name, price, typeId });
  };

  return (
    <CreatorPagesLayout header="Adding new product">
      <div className="flex gap-[64px]">
        <div className="flex-[1] space-y-6">
          <p className="text-black">
            Make some selections, fill in some boxes, and go live in minutes.
          </p>
          <p className="text-black">
            Our Help Center has everything you need to know.
          </p>
        </div>
        <div className="flex-[3] space-y-6">
          <div className="space-y-2">
            <p className="text-black">Name</p>
            <Input
              placeholder="Name of product"
              size="large"
              className="rounded border-black"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black">Type</p>
            <div className="grid grid-cols-3 gap-4">
              {productTypes.map((type) => (
                <ProductTypeCard
                  name={type.name}
                  description={type.description}
                  isSelected={type.id === typeId}
                  Icon={type.Icon}
                  iconColor={type.iconColor}
                  onClick={() => setTypeId(type.id)}
                  key={type.id}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-black">Price</p>
            <Input
              placeholder="Price your product"
              size="large"
              prefix={<RiMoneyDollarCircleLine />}
              className="rounded border-black"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-pink_primary px-4 py-3 text-black border border-black rounded"
          >
            Add Product
          </button>
        </div>
      </div>
    </CreatorPagesLayout>
  );
};

export default CreatorNewProduct;
