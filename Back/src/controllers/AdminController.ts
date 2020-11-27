import db from "../models";

class AdminController {
    async sync(): Promise<String> {
        try {
            await db.sequelize.sync({ alter: true });
            return "Successo";
        } catch (err) {
            throw err;
        }
    }

    async novaMoeda(body): Promise<Object> {
        try {
            const moeda = await db.Moedas.create(body);
            return moeda;
        } catch (err) {
            throw err;
        }
    }
}

export default AdminController;
