module.exports = (sequelize,DataTypes) =>{
    const Tasks = sequelize.define("Tasks",{
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reminder: {
            type: DataTypes.BOOLEAN,
        }
    });
    return Tasks;
}