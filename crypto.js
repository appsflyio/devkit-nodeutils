"use strict";

var crypto = require('crypto');
var util = require('util');

var iv = '$$appsfly.io##$$';

module.exports = {

    encrypt: function (data,custom_key) {
        var key = custom_key;
        var algo = '256';
        switch (key.length) {
            case 16:
                algo = '128';
                break;
            case 24:
                algo = '192';
                break;
            case 32:
                algo = '256';
                break;

        }
        var cipher = crypto.createCipheriv('AES-' + algo + '-CBC', key, iv);
        var encrypted = cipher.update(data, 'binary', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    },
    decrypt: function (data,custom_key) {
        var key = custom_key;
        var algo = '256';
        switch (key.length) {
            case 16:
                algo = '128';
                break;
            case 24:
                algo = '192';
                break;
            case 32:
                algo = '256';
                break;
        }
        var decipher = crypto.createDecipheriv('AES-' + algo + '-CBC', key, iv);
        var decrypted = decipher.update(data, 'base64', 'binary');
        decrypted += decipher.final('binary');
        return decrypted;
    },

    gen_salt: function (length, cb) {
        crypto.randomBytes((length * 3.0) / 4.0, function (err, buf) {
            cb(err, buf.toString("base64"));
        });
    }
};