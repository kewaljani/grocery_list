module.exports = (sequelize, Sequelize) => {
  const Grocery = sequelize.define("grocery", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 50,
      },
    },
   description:  {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 200,
      },
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return Grocery;
};
