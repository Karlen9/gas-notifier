import { Context } from "telegraf";
export interface SessionDate {
  notify: boolean;
}

export interface IBotContext extends Context {
  session: SessionDate;
}