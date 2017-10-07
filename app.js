var util = require("./index");


//console.log(JSON.stringify({"hi":"hello"}))
util.genChecksum(JSON.stringify({"hi":"hello"}), "1234567890123456", function (err, checksum) {
    console.log(checksum);
});