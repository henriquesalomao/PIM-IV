module.exports = (sequelize, DataTypes) => {
    const OrdensCliente = sequelize.define("OrdensCliente", {
        Id_Ordem: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Ord_Tipo: {
            type: DataTypes.STRING(20), // SAQUE, DEPOSITO, TROCA_MAIS, TROCA_MENOS
            allowNull: false
        },
        Valor_Ordem: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Data_Hora: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        Saldo_Atual: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        tableName: "Ordens_Cliente",
        timestamps: false,
        freezeTableName: true
    });

    OrdensCliente.associate = (models) => {
        OrdensCliente.belongsTo(models.Moedas, {
            foreignKey: {
                allowNull: false,
                field: "Id_Moedas",
                name: "Id_Moedas"
            }
        });
        OrdensCliente.belongsTo(models.InfoCliente, {
            foreignKey: {
                allowNull: false,
                field: "Cliente",
                name: "Cliente"
            }
        });
    };

    return OrdensCliente;
};
