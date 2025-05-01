export default (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    googleId: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    rollNumber: {
      type: Sequelize.STRING,
      unique: true
    },
  });
  return User;
};