"use strict";

var crypt = require('./crypto');
var util = require('util');
var crypto = require('crypto');

module.exports.ChecksumUtils = {
    genChecksum:function(data, key, cb) {
        crypt.gen_salt(8, function (err, salt) {
            var sha256 = crypto.createHash('sha256').update(salt+data).digest('hex');
            var check_sum = sha256+salt;
            cb(undefined, crypt.encrypt(check_sum, key));
        });
    },
    verifyChecksum:function(data, key,checksumhash) {
        try{
            var checksum = crypt.decrypt(checksumhash, key);
            var salt = checksum.slice(checksum.length-8, checksum.length);
            var sha256 = checksum.slice(0, checksum.length - 8);
            var hash = crypto.createHash('sha256').update(salt+data).digest("hex");
            return (hash === sha256);
        }catch(err){
            return false;
        }
    }
}

var AppInstance = function (config) {
    this.config = config;
    return this;
}

AppInstance.prototype.exec = function(micromodule_id, intent, payload, userID){
    var userID = userID || "generic";
    return new Promise(function(resolve, reject){
        var body = {
            intent:intent,
            data:payload
        }
        var payload = JSON.stringify(body) + "|" + micromodule_id + "|" + this.config.appKey + "|" + userID;
        module.exports.ChecksumUtils.genChecksum(payload, this.config.secret, function (err, checksum) {
            if(!err){
                request.post({
                    url:this.config.repoUrl + "/executor/exec",
                    method:"POST",
                    json:body,
                    headers:{
                        "X-Module-Handle":micromodule_id,
                        "X-App-Key":this.config.appKey,
                        "X-Checksum":checksum,
                        "X-UUID":userID
                    }
                }, function (err, resp, body) {
                    if(err){
                        reject(err);
                    }
                    else{
                        if(module.exports.ChecksumUtils.verifyChecksum(body, this.config.secret, resp.headers["X-Checksum"])){
                            resolve(JSON.parse(body));
                        }
                        else{
                            reject({message:"Checksum Validation Failed"});
                        }
                    }
                });
            }
            else{
                reject(err);
            }
        })
    });
}

module.exports.AppInstance = AppInstance;

