module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    genre: DataTypes.STRING
  }

  return connection.define('Artist', schema);
};