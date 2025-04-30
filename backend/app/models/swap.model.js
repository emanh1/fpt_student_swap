export default (sequelize, Sequelize) => {
  const Swap = sequelize.define("swap", {
    subjectCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fromRollNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fromClass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currentSlot: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desiredSlot: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
    matchWith: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return Swap;
};
