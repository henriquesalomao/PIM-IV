import db from "../models";

class OrdemController {
    async deposito(body, jwtPayload): Promise<String> {
        try {
            const saldo = await db.InfSaldoConta.findOne({ where: { Cliente: jwtPayload.cpf } });

            await db.OrdensCliente.create({
                Id_Moedas: "R$",
                Ord_Tipo: "DEPOSITO",
                Valor_Ordem: parseFloat(body.Valor),
                Saldo_Atual: parseFloat(saldo.get("Saldo_Reais")),
                Cliente: jwtPayload.cpf
            });
            await saldo.update({ Saldo_Reais: parseFloat(saldo.get("Saldo_Reais")) + parseFloat(body.Valor) });
            return "Sucesso";
        } catch (err) {
            throw err;
        }
    }

    async novaTransferencia(body, jwtPayload): Promise<String> {
        try {
            let {
                De_Moeda, Para_Moeda, De_Valor, Para_Valor
            } = body;

            const moedas = ["R$", "BTC", "LTC", "ETH", "PAXG"];
            if (!moedas.includes(De_Moeda) || !moedas.includes(Para_Moeda)) throw new Error("Moeda Inválida");

            De_Valor = parseFloat(De_Valor);
            Para_Valor = parseFloat(Para_Valor);

            const saldo = await db.InfSaldoConta.findOne({ where: { Cliente: jwtPayload.cpf } });

            if (De_Moeda === "R$") De_Moeda = "Reais";
            if (Para_Moeda === "R$") Para_Moeda = "Reais";

            if (saldo.get(`Saldo_${De_Moeda}`) < De_Valor) throw new Error("Valor inválido");

            const toUpdate = {};
            toUpdate[`Saldo_${De_Moeda}`] = saldo.get(`Saldo_${De_Moeda}`) - De_Valor;
            toUpdate[`Saldo_${Para_Moeda}`] = saldo.get(`Saldo_${Para_Moeda}`) + Para_Valor;

            const ordemTrocaMenos = {
                Id_Moedas: body.De_Moeda,
                Ord_Tipo: "TROCA_MENOS",
                Valor_Ordem: De_Valor,
                Saldo_Atual: toUpdate[`Saldo_${De_Moeda}`],
                Cliente: jwtPayload.cpf
            };
            const ordemTrocaMais = {
                Id_Moedas: body.Para_Moeda,
                Ord_Tipo: "TROCA_MAIS",
                Valor_Ordem: Para_Valor,
                Saldo_Atual: toUpdate[`Saldo_${Para_Moeda}`],
                Cliente: jwtPayload.cpf
            };

            await saldo.update(toUpdate);
            await db.OrdensCliente.create(ordemTrocaMenos);
            await db.OrdensCliente.create(ordemTrocaMais);

            return "Sucesso";
        } catch (err) {
            throw err;
        }
    }

    async saque(body, jwtPayload): Promise<String> {
        try {
            const saldo = await db.InfSaldoConta.findOne({ where: { Cliente: jwtPayload.cpf } });
            if (saldo.get("Saldo_Reais") < parseFloat(body.Valor)) throw new Error("Valor inválido");

            await db.OrdensCliente.create({
                Id_Moedas: "R$",
                Ord_Tipo: "SAQUE",
                Valor_Ordem: parseFloat(body.Valor),
                Saldo_Atual: parseFloat(saldo.get("Saldo_Reais")),
                Cliente: jwtPayload.cpf
            });
            await saldo.update({ Saldo_Reais: parseFloat(saldo.get("Saldo_Reais")) - parseFloat(body.Valor) });
            return "Sucesso";
        } catch (err) {
            throw err;
        }
    }

    async extrato(jwtPayload): Promise<Object> {
        try {
            const temp = await db.OrdensCliente.findAll({
                where: { Cliente: jwtPayload.cpf },
                attributes: ["Ord_Tipo", "Valor_Ordem", "Saldo_Atual", "Id_Moedas", "Data_Hora"],
                order: [["Data_Hora", "DESC"]]
            });
            return temp;
        } catch (err) {
            throw err;
        }
    }
}

export default OrdemController;
