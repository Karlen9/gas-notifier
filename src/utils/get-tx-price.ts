import Web3 from "web3";
import { getEthPrice } from "../../api/getEthPrice";
import { IBotContext } from "../context/context.interface";
import { Telegraf } from "telegraf";
export const getTxPrice = async (bot: Telegraf<IBotContext>) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/bd8aa9a152d3404fa2a9ed6eb25bd931"
    )
  );

  const gasUsed = 21000;
  await getEthPrice().then((res) => {
    web3.eth.getGasPrice().then((gasPrice) => {
      const gas = web3.utils.fromWei(gasPrice, "Gwei");
      const gasInEth = (parseInt(gas) * gasUsed) / 1e9;
      const currentGasPrice = (gasInEth * parseInt(res)).toFixed(2);
      bot.command("price", (ctx) => {
        return ctx.reply(`Current gas price is ${currentGasPrice}`);
      });
    });
  });
};
