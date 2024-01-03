const fs = require("fs");

function read() {
  const pkg = JSON.parse(fs.readFileSync("../package.json"));

  if (pkg.version === "1.0.0") {
    return 111;
  } else {
    return 222;
  }
}

module.exports = {
  read,
};
