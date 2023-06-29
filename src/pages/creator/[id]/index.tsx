import { CreatorPagesLayout } from "@components/creator";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input, message, Skeleton } from "antd";

const Creator = () => {
  const router = useRouter();
  const { id } = router.query;
  const [publicKey, setPublicKey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const responseShop = await fetch(`/api/shop?id=${id}`, {
        method: "GET",
      });
      const shop = await responseShop.json();
      setName(shop.name);
      setEmail(shop.email);
      setPublicKey(shop.publicKey);
      setLoading(false);
    };
    getData();
  }, []);
  const updateShop = async () => {
    try {
      setLoading(true);
      const updateShopResponse = await fetch("/api/shop", {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          name: name,
          email: email,
          publicKey: publicKey,
        }),
      });
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Upload product successfully",
      });
    } catch (e) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Upload product failed",
      });
    }
  };
  return (
    <CreatorPagesLayout header="Home">
      {contextHolder}
      <div className="flex gap-[64px]">
        <div className="flex-[1] space-y-6">
          <p className="text-black">Update your shop profile, got to</p>
          <p className="text-black">
            Our Help Center has everything you need to know.
          </p>
        </div>

        <div className="flex-[3] space-y-6">
          <Skeleton loading={isLoading} active>
            <div className="space-y-2">
              <p className="text-black text-lg">Shop Name</p>
              <Input
                placeholder="Name"
                size="large"
                value={name}
                className="rounded border-black"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-black text-lg">Email</p>
              <Input
                placeholder="Email"
                size="large"
                value={email}
                className="rounded border-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-black text-lg">Public Key</p>
              <Input
                placeholder="Public key"
                size="large"
                value={publicKey}
                className="rounded border-black"
                onChange={(e) => setPublicKey(e.target.value)}
              />
            </div>
          </Skeleton>
          <button
            onClick={updateShop}
            className="bg-pink_primary px-4 py-3 text-black border border-black rounded"
          >
            Update Profile
          </button>
        </div>
      </div>
    </CreatorPagesLayout>
  );
};

export default Creator;
