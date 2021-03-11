module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
  }

  return connection.define('Song', schema);
};