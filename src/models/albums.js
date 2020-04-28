module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'id',
      },
    },
  };

  const Album = sequelize.define('Album', schema);
  return Album;
};
