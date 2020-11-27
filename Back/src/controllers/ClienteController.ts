import db from "../models";

class ClienteController {
    async register(body): Promise<String> {
        try {
            console.log(body);
            const temp = await db.InfoCliente.findOne({ where: { Email: body.Email } });
            if (temp) throw new Error("Já existe um usuário com esse email");

            const cliente = await db.InfoCliente.create(body);

            const toCreate = {
                Cliente: cliente.get("CPF"), Saldo_Reais: 0, Saldo_BTC: 0, Saldo_LTC: 0, Saldo_ETH: 0, Saldo_PAXG: 0
            };
            await db.InfSaldoConta.create(toCreate);

            return "Sucesso";
        } catch (err) {
            throw err;
        }
    }

    async dados(jwtPayload): Promise<Object> {
        try {
            const temp = await db.InfoCliente.findOne({ where: { CPF: jwtPayload.cpf }, attributes: ["Nome", "Sobrenome"] });

            const saldo = await db.InfSaldoConta.findOne({ where: { Cliente: jwtPayload.cpf }, attributes: ["Saldo_Reais", "Saldo_BTC", "Saldo_LTC", "Saldo_ETH", "Saldo_PAXG"] });

            return { ...saldo.dataValues, Nome: temp.get("Nome"), Sobrenome: temp.get("Sobrenome") };
        } catch (err) {
            throw err;
        }
    }
}

export default ClienteController;
