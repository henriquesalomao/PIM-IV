module.exports = (sequelize, DataTypes) => {
    const InfSaldoConta = sequelize.define("InfSaldoConta", {
        Id_Saldo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Saldo_Reais: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Saldo_BTC: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Saldo_LTC: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Saldo_ETH: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Saldo_PAXG: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: "Inf_Saldo_Conta",
        timestamps: false,
        freezeTableName: true
    });

    InfSaldoConta.associate = (models) => {
        InfSaldoConta.belongsTo(models.InfoCliente, {
            foreignKey: {
                allowNull: false,
                field: "Cliente",
                name: "Cliente"
            }
        });
    };

    return InfSaldoConta;
};
