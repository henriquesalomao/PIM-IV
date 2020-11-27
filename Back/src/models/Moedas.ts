module.exports = (sequelize, DataTypes) => {
    const Moedas = sequelize.define("Moedas", {
        Id_Moedas: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        Descricao: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Data_Atualizacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "Moedas",
        timestamps: false,
        freezeTableName: true
    });

    return Moedas;
};
