import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { getTxPrice } from "../utils/get-tx-price";
import { getEthPrice } from "../api/getEthPrice";
import { intervalRequest } from "../utils/intervalRequest";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply(
        "Hi. This is a bot and he will notify you when gas price is low or high. Type '/price' to know estimated tx cost",
        Markup.inlineKeyboard([
          // Markup.button.callback("txPrice", "tx_price"),
          Markup.button.callback("ethPrice", "eth_price"),
        ])
      );
    });

    // this.bot.action("tx_price", async () => {
    //   getTxPrice(this.bot);
    // });

    this.bot.action("eth_price", async (ctx) => {
      await intervalRequest({ctx, frequency: 20000});
    });
  }
}
