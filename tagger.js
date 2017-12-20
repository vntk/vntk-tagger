'use strict';
const vntk = require('vntk');

const tagger = new vntk.NER('./models/model.bin');

exports.tag = function (filename) {
    tagger.tag(filename);
}