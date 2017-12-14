const fs = require('fs');
const path = require('path');

class IobParser {

    constructor() {
    }

    toListSents(filename) {
        let data = fs.readFileSync(filename, 'utf8');
        let sents = data.split('\n\n');
        let iobSents = [];
        for (let i = 0; i < sents.length; i ++) {
            let sent = sents[i].split('\n');
            let tokens = sent.map((word) => word.split(' '));
            iobSents.push(tokens);
        }
        return iobSents;
    }

    saveFile(sents, filename) {
        // save to file
    }

}

module.exports = new IobParser();