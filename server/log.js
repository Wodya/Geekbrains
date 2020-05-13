const moment = require("moment");
const fs = require("fs");

const info = (str) => {
	fs.appendFile('./server/db/log.txt',`${moment().format("YYYY-MM-DD HH:mm")} ${str}\n`,(err) => {
		if (err) {
			console.log(`Error ${err}`);
		}});
}

module.exports = {info};
