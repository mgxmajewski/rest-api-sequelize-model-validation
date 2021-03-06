'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
      unique: {
        msg: 'Email already exists'
      },
      validate: {
        notNull: {
          msg: 'A email is required'
        },
        isEmail: {
          msg: 'Please provide email'
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
        isDate: {
          msg: 'Please provide valid birthday'
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL, // set a virtual field
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide password'
        },
        len: {
          args: [8, 20],
          msg: 'Must be in range of 8-20 characters'
        }
      }
    },
    confirmedPassword: { // new attribute
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        if (val === this.password) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('confirmedPassword', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        }
      }
    }
  },{ sequelize });

  return User;
};
