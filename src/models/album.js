module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artists',
        key: 'id',
      },
    },
  };

  const Album = sequelize.define('Album', schema);
  Album.associate = models => {
    Album.belongsTo(models.Artist, { foreignKey: 'artist', as: 'artists' });
  };
  return Album;
};
