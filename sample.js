var util = require("./index");

// // Generate Checksum
util.genChecksum("testasdasdf", "1234567890123456", function (err, checksum) {
    // console.log(checksum);
    console.log(util.verifyChecksum("testasdasdf", "1234567890123456", "Bw93+j90mwhMMapUKf3zGzK268MFx14KMfejaBnkAyU+ryXH5VZpt3+AF7oJi0KROI5lcxfTX5rmCkcGJEF4s3L71204g2Lut74EnGJRuvY="));
});

