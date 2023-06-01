import { getEthPrice } from "../api/getEthPrice";
import { IBotContext } from "../context/context.interface";


type Params = {
  ctx: IBotContext;
  frequency?: number;
}

export async function intervalRequest(params: Params){
  const {ctx, frequency = 5000} = params;
  const date = new Date();
  let price = await getEthPrice();

  ctx.editMessageText(`ETH/USD: ${parseInt(price).toFixed(1)} \nTime: ${date.toLocaleTimeString()}`);

  setInterval(async() => {
    const date = new Date();
    const freshPrice = await getEthPrice()
    console.log('price: ',parseInt(price).toFixed(1), 'fresh: ', parseInt(freshPrice).toFixed(1)) 
    if(parseInt(price).toFixed(1) !== parseInt(freshPrice).toFixed(1)) {
      price = freshPrice;
      ctx.editMessageText(`ETH/USD: ${parseInt(freshPrice).toFixed(1)} \nTime: ${date.toLocaleTimeString()}`);
    }

  }, frequency) 
}