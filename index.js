"use strict";

var crypt = require('./crypto');
var util = require('util');
var crypto = require('crypto');

module.exports.genChecksum = function(data, key, cb) {
    crypt.gen_salt(4, function (err, salt) {
        var sha256 = crypto.createHash('sha256').update(salt+data).digest('hex');
        var check_sum = sha256+salt;
        console.log(sha256);
        console.log(salt);
        var encrypted = crypt.encrypt(check_sum, key);
        var CHECKSUMHASH = encodeURIComponent(encrypted);
        CHECKSUMHASH = encrypted;
        cb(undefined, CHECKSUMHASH);
    });
}

module.exports.verifyChecksum = function(params, key,checksumhash) {
    var checksum = crypt.decrypt(checksumhash, key);
    var salt = checksum.substr(checksum.length - 4);
    var sha256 = checksum.substr(0, checksum.length - 4);
    var hash = crypto.createHash('sha256').update(salt+data).digest('hex');
    if (hash === sha256) {
        return true;
    } else {
        util.log("checksum is wrong");
        return false;
    }
}
