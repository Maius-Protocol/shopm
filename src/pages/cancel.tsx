import type { NextPage } from "next";
import { Result, Button } from "antd";
const Cancel: NextPage = () => {
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
        status="error"
        title="Payment Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button key="buy" href={"/products"}>
            Buy Again
          </Button>,
        ]}
      ></Result>
      ,
    </div>
  );
};

export default Cancel;
