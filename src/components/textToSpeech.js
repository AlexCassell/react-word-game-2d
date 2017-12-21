var speechSynthesis = require('speech-synthesis');

// let msg = new SpeechSynthesisUtterance('La política es dar multas a los infractores.', "Google UK English Male");
// window.speechSynthesis.speak(msg);


// let preKWordsArray = ["a", "and", "away", "big", "blue", "can", "come", "down", "find", "for", "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little", "look", "make", "me", "my", "not", "one", "play", "red", "run", "said", "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"]

let actualSentencesArray = [[" I have a ", " hat.", "red", "the", "fun"], [" My ", " has a tail.", "dog", "let", "arm"],
[" I can ", " fast!", "run", "tan", "let"], [" Do you like ", "?", "me", "do", "hi"]];
let currentSentence = "", blankSpace = "_____", randNum = "0";
let currentStart = "", currentEnd = "", currentCorrectAnswer = "" , currentIncorrectAnswerOne = "", currentIncorrectAnswerTwo = "";


const TextToSpeech = () => {
    randNum = Math.floor(Math.random()*actualSentencesArray.length+0);
    // console.log(randNum);
    currentCorrectAnswer = actualSentencesArray[randNum][2];
    currentIncorrectAnswerOne = actualSentencesArray[randNum][3];
    currentIncorrectAnswerTwo = actualSentencesArray[randNum][4];
    currentStart = actualSentencesArray[randNum][0];
    currentEnd = actualSentencesArray[randNum][1]
    currentSentence = "";
    currentSentence = currentStart + blankSpace + currentEnd;
    speechSynthesis(currentStart + " blank " + currentEnd, "Google US English");
    return null;
}




export default TextToSpeech;
export {currentSentence};
export {randNum};
export {currentCorrectAnswer};
export {currentIncorrectAnswerOne};
export {currentIncorrectAnswerTwo};