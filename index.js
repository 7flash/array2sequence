module.exports = arrayToStringSequencesAsync;

function extractArraySequences(array) {
    return array.reduce(function (sequences, elem, index, arr) {
        if (index === 0 || (elem !== arr[index - 1] + 1 && elem !== arr[index - 1])) {
            sequences.push({start: index, end: index});
        } else {
            sequences[sequences.length - 1].end = index;
        }
        return sequences;
    }, []);
}

function arrayToStringSequences(array) {
    if (array === undefined || array.constructor !== Array) return false;
    var stringSequences = '';
    var sequences = extractArraySequences(array);
    sequences.forEach(function (sequence) {
        var stringSequence = array[sequence.start];
        if (array[sequence.start] !== array[sequence.end]) {
            stringSequence = stringSequence + '-' + array[sequence.end];
        }
        stringSequences = stringSequences.concat(stringSequence + ',');
    });
    stringSequences = stringSequences.slice(0, -1);
    return stringSequences;
}

function arrayToStringSequencesAsync(array) {
    return new Promise(function (resolve, reject) {
        var result = arrayToStringSequences(array);
        if (result) resolve(result);
        else reject(new Error());
    });
}