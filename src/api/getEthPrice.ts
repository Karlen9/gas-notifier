import axios from "axios";

export const getEthPrice = async () => {
  const res = await axios.get(
    "https://www.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
  );

  return res.data.price;
};
