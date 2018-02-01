/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt= require("bcrypt")

module.exports = {

  attributes: {
    email: {
      type: "email",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      minLength: 6,
      protected: true,
      required: true,
      columnName: "encryptedPassword"
    },
    toJSON: function () {
      var obj = this.toObject()
      delete obj.password
    }
  },

  beforeCreate: function(values, cb) {     // sails model lifecycle cb
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);    
      values.password = hash;
        cb();
    });
  }

};

