var util = require("./index");

// // Generate Checksum
util.genChecksum("test", "1234567890123456", function (err, checksum) {
    console.log(util.verifyChecksum("test", "1234567890123456", "KUl9Uchy4CofX023RHzMHP20UYntr0OqLtNjdm6drrutPUkxgtk1PlegVhhaPrX1GUqG7dEZsOTq1GhORMKrC5sXpYv7XJDOrWCK4e7p8SI="));
});



