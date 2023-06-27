import type { NextPage } from "next";
import { Result, Button } from "antd";

const Success: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Result
        status="success"
        title="Successfully Purchased With Shopm!"
        subTitle="Your order takes 1-5 minutes, please wait."
        extra={[
          <Button key="buy" href={"/products"}>
            Buy Again
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
