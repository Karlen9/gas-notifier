import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import { getTxPrice } from "../utils/get-tx-price";

export class GetCurrentPrice extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(): Promise<void> {
    await getTxPrice(this.bot);
  }
}
