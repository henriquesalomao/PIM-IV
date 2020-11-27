module.exports = (sequelize, DataTypes) => {
    const InfoCliente = sequelize.define("InfoCliente", {
        CPF: {
            type: DataTypes.STRING(11),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        Nome: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Sobrenome: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Senha: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        RG: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Digito: {
            type: DataTypes.STRING(1),
            allowNull: false
        },
        Sexo: {
            type: DataTypes.STRING(1),
            allowNull: false
        },
        Data_Nascimento: {
            type: DataTypes.STRING(11),
            allowNull: false
        }
    }, {
        tableName: "Info_Cliente",
        timestamps: false,
        freezeTableName: true
    });

    return InfoCliente;
};
