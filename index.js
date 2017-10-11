"use strict";

var crypt = require('./crypto');
var util = require('util');
var crypto = require('crypto');

module.exports.genChecksum = function(data, key, cb) {
    crypt.gen_salt(8, function (err, salt) {
        var sha256 = crypto.createHash('sha256').update(salt+data).digest('hex');
        var check_sum = sha256+salt;
        cb(undefined, crypt.encrypt(check_sum, key));
    });
}

module.exports.verifyChecksum = function(data, key,checksumhash) {
    var checksum = crypt.decrypt(checksumhash, key);
    var salt = checksum.slice(checksum.length-8, checksum.length);
    var sha256 = checksum.slice(0, checksum.length - 8);
    console.log(salt+data);
    var hash = crypto.createHash('sha256').update(salt+data).digest("hex");
    if (hash === sha256) {
        return true;
    } else {
        util.log("checksum is wrong");
        return false;
    }
}
