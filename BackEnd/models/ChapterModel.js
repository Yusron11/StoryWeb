import Sequelize from "sequelize";
import db from "..//config//Database.js";
import Story from "./StoryModel.js";

const {DataTypes} = Sequelize;

const Chapter = db.define('chapter', {
    title: DataTypes.STRING,
    chapter_story:DataTypes.TEXT,
    story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Story,
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
});

Chapter.belongsTo(Story, { foreignKey: 'story_id' });
Story.hasMany(Chapter, { foreignKey: 'story_id' });

export default Chapter;

(async () => {
    await db.sync();
})();
