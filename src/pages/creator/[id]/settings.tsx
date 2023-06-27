import { CreatorPagesLayout, ProductTypeCard } from "@components/creator";
import { Input } from "antd";
import { ProductThumbnail } from "@components/product/thumbnail";
import { InboxOutlined } from "@ant-design/icons";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";

const CreatorSettings = () => {
  const router = useRouter();
  const { id } = router.query;
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const createPayment = async () => {};
  return (
    <CreatorPagesLayout header="Settings">
      <div className="flex gap-[64px]">
        <div className="flex-[1] space-y-6">
          <p className="text-black">Make some payment method, got to</p>
          <p className="text-black">
            Our Help Center has everything you need to know.
          </p>
        </div>
        <div className="flex-[3] space-y-6">
          <div className="space-y-2">
            <p className="text-black text-lg">Candy Public Key</p>
            <Input
              placeholder="Public key"
              size="large"
              className="rounded border-black"
              onChange={(e) => setPublicKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-black text-lg">Candy Private key</p>
            <Input
              placeholder="Private key"
              size="large"
              prefix={<RiMoneyDollarCircleLine />}
              className="rounded border-black"
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>
          <button
            onClick={createPayment}
            className="bg-pink_primary px-4 py-3 text-black border border-black rounded"
          >
            Add Payment
          </button>
        </div>
      </div>
    </CreatorPagesLayout>
  );
};

export default CreatorSettings;
