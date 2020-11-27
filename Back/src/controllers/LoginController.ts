import db from "../models";
import { signIn } from "../auth";

class ClienteController {
    async loginCliente(body): Promise<Object> {
        try {
            const { Email, Senha } = body;

            const login = await db.InfoCliente.findOne({ where: { Email, Senha } });
            if (!login) throw new Error("Login Inválido");

            return { token: signIn({ cpf: login.get("CPF") }) };
        } catch (err) {
            throw err;
        }
    }
}

export default ClienteController;
