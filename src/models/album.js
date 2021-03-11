module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER
  }

  return connection.define('Album', schema);
};