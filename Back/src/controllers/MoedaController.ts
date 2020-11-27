import express, { Request, Response } from "express";
import axios from "axios";

const url = "https://www.mercadobitcoin.net/api/<coin>/ticker";

function formatResponse({ buy, sell, last }) {
    const temp: any = {};

    temp.buy = parseFloat(buy).toFixed(2);
    temp.sell = parseFloat(sell).toFixed(2);
    temp.last = parseFloat(last).toFixed(2);
    return temp;
}

class MoedaController {
    async getValues(body): Promise<Object> {
        try {
            const { Moedas } = body;
            console.log(Moedas);

            const promisses = [];
            Moedas.forEach((moeda) => {
                promisses.push(axios.get(url.replace("<coin>", moeda)));
            });

            const temp = {};

            const res = await Promise.all(promisses);
            res.forEach((value, index) => {
                temp[Moedas[index]] = formatResponse(value.data.ticker);
            });

            return temp;
        } catch (err) {
            throw err;
        }
    }
}

export default MoedaController;
