'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: 'Please provide name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A email is required'
        },
        isEmail: {
          msg: 'Please provide name'
        }
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A birthday is required'
        },
        notEmpty: {
          msg: 'Please provide name'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide name'
        }
      }
    }
  }, { sequelize });

  return User;
};
