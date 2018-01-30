var speechSynthesis = require('speech-synthesis');

let actualSentencesArray = [[" I have a ", " hat.", "red", "the", "fun"], [" My ", " has a tail.", "dog", "let", "arm"],
[" I can ", " fast!", "run", "tan", "let"], [" Do you like ", "?", "me", "do", "hi"], [" I ", "a snack.", "ate", "jump", "blue"], 
[" That is a ", "truck.", "big", "away", "can"], [" She went ", " the slide.", "down", "look", "three"], [" The sky is ", " .", "blue", "go", "find"],
[" My friend ", " I play.", "and", "for", "look"], [" I can’t ", " my pencil.", "find", "funny", "help"], [" The rabbit is ", " the hole.", "in", "purple", "little"]];
let currentSentence = "", blankSpace = "_____", randNum = 0;
let currentStart = "", currentEnd = "", currentCorrectAnswer = "" , currentIncorrectAnswerOne = "", currentIncorrectAnswerTwo = "";


const TextToSpeech = () => {
    if(randNum === 9){
        randNum = 0;
    }
    currentCorrectAnswer = actualSentencesArray[randNum][2];
    currentIncorrectAnswerOne = actualSentencesArray[randNum][3];
    currentIncorrectAnswerTwo = actualSentencesArray[randNum][4];
    currentStart = actualSentencesArray[randNum][0];
    currentEnd = actualSentencesArray[randNum][1]
    currentSentence = "";
    currentSentence = currentStart + blankSpace + currentEnd;
    speechSynthesis(currentStart + " blank " + currentEnd, "Google US English");
    randNum = randNum + 1;
    return null;
}




export default TextToSpeech;
export {currentSentence};
export {randNum};
export {currentCorrectAnswer};
export {currentIncorrectAnswerOne};
export {currentIncorrectAnswerTwo};