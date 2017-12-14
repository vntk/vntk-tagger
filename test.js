const path = require('path');
const crfsuite = require('crfsuite');
const iobParser = require('./iob');
const featEx = require('./features');

let train_sents = iobParser.toListSents('./data/conll2002/esp.train');
// let test_sents = iobParser.toListSents('./data/conll2002/esp.testb');

// console.log(train_sents[0])

let template =  [
    'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
    'T[0].istitle', 'T[-1].istitle', 'T[1].istitle', 'T[-2].istitle', 'T[2].istitle',
    //# word unigram and bigram
    'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
    'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
    //# pos unigram and bigram
    'T[-2][1]', 'T[-1][1]', 'T[0][1]', 'T[1][1]', 'T[2][1]',
    'T[-2,-1][1]', 'T[-1,0][1]', 'T[0,1][1]', 'T[1,2][1]',
    //# ner
    'T[-3][3]', 'T[-2][3]', 'T[-1][3]',
];

const trainer = new crfsuite.Trainer();
// set params
trainer.set_params({
    c1: 0.1,
    c2: 0.1,
    max_iterations: 1000
});

function transform(tokens) {
    return tokens.map((token, i) => featEx.word2features(tokens, i, template));
}

// train_sents.slice(0, 3).forEach((sent, index) => {
//     let X_train = transform(sent);
//     let y_train = featEx.sent2labels(sent);
//     console.log('X_train:', X_train)
//     console.log('y_train:', y_train);
        
// })

train_sents.forEach((sent, index) => {
    console.log('Feeding trainer, sent at: ', index);
    let X_train = transform(sent);
    let y_train = featEx.sent2labels(sent);
    trainer.append(X_train, y_train);
});

let model_filename = path.resolve('./model.bin')

console.log('Start training ...');
trainer.train(model_filename);
console.log('Training done!');

// console.log('Testing ...')

// test_sents.slice(0, 5).forEach((sent, index) => {
//     console.log('Predict, sent at: ', index);
//     let X_test = transform(sent);
//     let y_test = featEx.sent2labels(sent);
//     let output = tagger.tag(X_test);

//     console.log('input: ', sent);
//     console.log('output: ', output);
// });



// X_train = [sent2features(s) for s in train_sents]
// y_train = [sent2labels(s) for s in train_sents]

// X_test = [sent2features(s) for s in test_sents]
// y_test = [sent2labels(s) for s in test_sents]
