var util = require("./index");

// Generate Checksum
util.genChecksum(JSON.stringify({"hi":"hello"}), "1234567890123456", function (err, checksum) {
    // Verify Checksum
    util.verifyChecksum(JSON.stringify({"hi":"hello"}), "1234567890123456", checksum);
});


