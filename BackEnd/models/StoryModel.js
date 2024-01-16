import Sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Story = db.define('story', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    category: {
        type: DataTypes.ENUM,
        values: ['Financial', 'Technology', 'Health'], 
    },
    tags: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM,
        values: ['Draft', 'Publish'], 
    },
}, {
    freezeTableName: true,
});

export default Story;

(async() => {
    await db.sync();
})();