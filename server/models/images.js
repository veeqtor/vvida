module.exports = function(sequelize, DataType) {
  return sequelize.define('Images', {
      public_id: {
        type: DataType.STRING,
        allowNull: false
      },

      img_url: {
        type: DataType.STRING,
        allowNull: false,
      }
    },
    // table configuration
    {
      // prevent timestamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to plural
      freezetableName: true
    });
};
