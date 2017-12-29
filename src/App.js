import React, { Component } from 'react';
import './css/App.css';
// import ReactHowler from 'howler'
// import { Howl } from 'howler'


import TextToSpeech from './components/textToSpeech.js';
import {currentSentence} from './components/textToSpeech.js';
import {currentCorrectAnswer} from './components/textToSpeech.js';
import {currentIncorrectAnswerOne} from './components/textToSpeech.js';
import {currentIncorrectAnswerTwo} from './components/textToSpeech.js';

let originalTime = 45, time = 0, timeLeft = 0, tmpRanking = "", position = 1, answersCorrect = 0, answersIncorrect = 0;

//sentences
let i = 0, x = 0, tempSentenceHolder = "";

let score = 0, overallScore = 0;
//Sounds
// let sound = new Howl({
//   // urls: ['./audio/UI_Quirky35.mp3', './audio/UI_Quirky35.ogg']
// }).play();
// let audio = new Audio('./audio/UI_Quirky35.mp3');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {'scores': ''};
    this.state = {'stats': ''};
    this.state = {'opponents': ''};
    this.state = {'player': ''};
    this.state = {'sentence': ''};
    this.state = {'timer': ''};
    this.state = {'backgroundColor': <div className="redBackground" />};
    this.state = {'playButtonText': 'CLICK HERE TO START!'};
    this.state = {'playButton': <div className="button__Wrapper"><button className="buttons__start" onClick={this.startGame.bind(this)}>{this.state.playButtonText}</button></div>};
  }
  
  componentWillMount(){
    this.setState({
      'timer': <div className="timer">Word Launch</div>,
      'scores':
      <div className="scoresWrapper">
        <div className="overallScore">
          Lifetime<br />
          {overallScore}
        </div>
        <div className="score">
          Score<br />
          {score}
        </div>
    </div>
  });
    
  }

  startGame(){
    position = 1;
    answersCorrect = 0;
    answersIncorrect = 0;
    score = 0;
    x = 0;
    setTimeout(this.saveTime.bind(this), 3000);
    setTimeout(this.startRace.bind(this), 3000);
    this.backgroundController();
    this.setRace();
    this.setState({
      'playButton': "",
      'stats': "",
      'scores':
      <div className="scoresWrapper">
        <div className="overallScore">
          Lifetime<br />
          {overallScore}
        </div>
        <div className="score">
          Score<br />
          {score}
        </div>
    </div>
  });
  
  }

  backgroundController(){
    setTimeout(this.blueBackgroundSpeechStarter.bind(this), 1000);
  }

  blueBackgroundSpeechStarter() {
    this.setState({'backgroundColor': <div className="blueBackground"><TextToSpeech /></div>
    }); 
  }

  blueBackground() {
    this.setState({'backgroundColor': <div className="blueBackground"></div>
    }); 
  }

  redBackground() {
    this.setState({'backgroundColor': <div className="redBackground"></div>    
    }); 
  }

  // Timer
  saveTime(){
    this.displaySentence();
    time = originalTime;
    this.timer();
  }

  timer(){
    if(time > 0 ){
    time--;
    setTimeout(this.timer.bind(this), 1000);
    if(time > (originalTime/2)){
    this.setState({
      'backgroundColor': <div className="blueBackground"></div>,
      'timer': <div className="timer">{time}</div>
  }); 
    }
    else {
      this.setState({
        'backgroundColor': <div className="redBackground"></div>,
        'timer': <div className="timer"><span className="timer__blinking">{time}</span></div>
    }); 
    }
    return(time);
  }
  else{
    this.setRank();
  }
  }

  //display sentence
  displaySentence(){
    // console.log("display");
    if(i <= currentSentence.length - 1){
      tempSentenceHolder += currentSentence[i];
      this.setState({
        'sentence':<div className="sentence">{tempSentenceHolder}</div>
        });
        i++
        setTimeout(this.displaySentence.bind(this), 50);
      }
      else{
        this.setAnswerChoices();
        i = 0;
        tempSentenceHolder = "";
      }
}

setAnswerChoices(){
  let positionOne = "";
  let positionTwo = "";
  let positionThree = "";
  let correctAnswer = <button className="buttons__answers" onClick={this.correctAnswer.bind(this)}>{currentCorrectAnswer}</button>;
  let wrongAnswerOne = <button className="buttons__answers" onClick={this.incorrectAnswer.bind(this)}>{currentIncorrectAnswerOne}</button>;
  let wrongAnswerTwo = <button className="buttons__answers" onClick={this.incorrectAnswer.bind(this)}>{currentIncorrectAnswerTwo}</button>;
  
  let randomNumber = Math.floor(Math.random()*3+1);
  if(randomNumber === 1){
    positionOne = correctAnswer;
    positionTwo = wrongAnswerOne;
    positionThree = wrongAnswerTwo;
  }
  else if(randomNumber === 2){
    positionOne = wrongAnswerOne;
    positionTwo = correctAnswer;
    positionThree = wrongAnswerTwo;
  }
  else if(randomNumber === 3){
    positionOne = wrongAnswerOne;
    positionTwo = wrongAnswerTwo;
    positionThree = correctAnswer;
  }
  this.setState({
    'sentence': 
    <div>
      <div className="sentence">{tempSentenceHolder}</div>
      <div className="answerWrapper">
      <br />
      {positionOne}      {positionTwo}      {positionThree}
    </div>
    </div>
    });
}

correctAnswer(){
  answersCorrect ++;
  score ++;
  console.log("answersCorrect: " + answersCorrect);
  if(position < 9){
    this.setState({
      'backgroundColor': <div className="blueBackground"><TextToSpeech /></div>
  });
  this.displaySentence();
  }
  this.setState({
    'scores':
    <div className="scoresWrapper">
      <div className="overallScore">
        Lifetime<br />
        {overallScore}
      </div>
      <div className="score">
        Score<br />
        {score}
      </div>
  </div>
});
this.moveForward();
}

incorrectAnswer(){
  console.log("answersIncorrect: " + answersIncorrect);
  answersIncorrect ++;
}

//move player
setRace(){
  this.setState({
    'player':
    <div> 
    <div className="player"/>
    <div className="opponentOne"/>
    <div className="opponentTwo"/>
    <div className="opponentThree"/>
    </div>
});
// this.startRace();//dev only
}

startRace(){
  this.setState({
    'player': <div className="player"/>,
    'opponents':
    <div> 
    <div className="opponentOneMoving"><div className="opponentShake"></div></div>
    <div className="opponentTwoMoving"><div className="opponentShake"></div></div>
    <div className="opponentThreeMoving"><div className="opponentShake"></div></div>
    </div>
});
}

moveForward(){
  if(position === 1){
    position ++;
    this.setState({
      'player': <div className="playerPosTwo"></div>
    });
  }
  else if(position === 2){
    position ++;
    this.setState({
      'player': <div className="playerPosThree"></div>
    });
  }
  else if(position === 3){
    position ++;
    this.setState({
      'player': <div className="playerPosFour"></div>
    });
  }
  else if(position === 4){
    position ++;
    this.setState({
      'player': <div className="playerPosFive"></div>
    });
  }
  else if(position === 5){
    position ++;
    this.setState({
      'player': <div className="playerPosSix"></div>
    });
  }
  else if(position === 6){
    position ++;
    this.setState({
      'player': <div className="playerPosSeven"></div>
    });
  }
  else if(position === 7){
    position ++;
    this.setState({
      'player': <div className="playerPosEight"></div>
    });
  }
  else if(position === 8){
    position ++;
    this.setState({
      'player': <div className="playerPosNine"></div>
    });
  }
  else if(position === 9){
    position ++;
    this.setState({
      'player': <div className="playerPosTen"></div>
    });
    this.setRank();
  }
  
}

setRank(){
  if(answersCorrect === 9 && answersIncorrect === 0 && timeLeft > 15){
    tmpRanking = "Captain";
    this.blueBackground();
  }
  else if(answersCorrect === 9 && answersIncorrect === 0 && timeLeft < 16){
    tmpRanking = "Commander";
    this.redBackground();
  }
  else if(answersCorrect === 8 && answersIncorrect === 0){
    tmpRanking = "Commander";
    this.redBackground();    
  }
  else if(answersCorrect === 9 || answersCorrect === 8 || answersCorrect === 7){
    tmpRanking = "Lieutenant Commander";
  }
  else if(answersCorrect === 6 || answersCorrect === 5 || answersCorrect === 4){
    tmpRanking = "Lieutenant";
  }
  else if(answersCorrect === 3 || answersCorrect === 2){
    tmpRanking = "Ensign";
  }
  else if(answersCorrect === 1 ||answersCorrect === 0){
    tmpRanking = "Midshipman";
  }
  this.preRaceOver();
}


preRaceOver(){
  console.log("preRaceOver();");
  let tmpLifeTimeScore = overallScore;
  let tmpScoreTally = timeLeft * score;
  let tmpOverallScoreTally = tmpScoreTally + overallScore
  overallScore += tmpOverallScoreTally;
  this.setState({
    'scores':
          <div className="scoresWrapper">
            <div className="overallScore">
              Lifetime<br />
              {overallScore}
            </div>
            <div className="score">
              Score<br />
              {score}
            </div>
        </div>,
    'player':
    <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOneShadow"/>
        <div className="planetTwoShadow"/>
        <div className="planetThreeShadow"/>
        <div className="planetFourShadow"/>
        <div className="planetFiveShadow"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>,
    'opponents':"",
    'sentence': "",
    'timer': <div className="rank">{tmpRanking}</div>,
    'stats': 
    <div>
      <div className="answered">
        <div className="answeredCorrectly">
          You answered {answersCorrect} correctly!
        </div>
        <div className="answeredIncorrectly">
          You answered {answersIncorrect} incorrectly!
        </div>
        </div>
      <div className="stats__score">
        Level Score: {score} <br />
        <span className="stats__score__underline">X Time Left: {timeLeft}</span><br />
        <span className="stats__score__textColor">+ {tmpScoreTally}</span><br />
        <span className="stats__score__underline">+ Lifetime Score: {tmpLifeTimeScore}</span><br />
        <span className="stats__score__textColor">+ {tmpOverallScoreTally}</span>
      </div>
      <div className="restartGame">
      <button className="buttons__restartGame" onClick={this.startGame.bind(this)}>Play Again</button>
      </div>
    </div>
  });
  timeLeft = time;
  time = 0;
this.raceOver();
}


raceOver(){
  if(answersCorrect > 0 && x === 0){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwoShadow"/>
        <div className="planetThreeShadow"/>
        <div className="planetFourShadow"/>
        <div className="planetFiveShadow"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }
  if(answersCorrect > 1 && x === 1){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThreeShadow"/>
        <div className="planetFourShadow"/>
        <div className="planetFiveShadow"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 2 && x === 2){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFourShadow"/>
        <div className="planetFiveShadow"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 3 && x === 3){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFiveShadow"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 4 && x === 4){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFive"/>
        <div className="planetSixShadow"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 5 && x === 5){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFive"/>
        <div className="planetSix"/>
        <div className="planetSevenShadow"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 6 && x === 6){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFive"/>
        <div className="planetSix"/>
        <div className="planetSeven"/>
        <div className="planetEightShadow"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 7  && x === 7){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFive"/>
        <div className="planetSix"/>
        <div className="planetSeven"/>
        <div className="planetEight"/>
        <div className="planetNineShadow"/>
      </div>
    </div>
    }); 
    setTimeout(this.raceOver.bind(this), 500);
  }

  if(answersCorrect > 8 && x === 8){
    this.setState({
      'player': <div>
      <div className="endOfRound"/>
      <div className="planetsWrapper">
        <div className="planetOne"/>
        <div className="planetTwo"/>
        <div className="planetThree"/>
        <div className="planetFour"/>
        <div className="planetFive"/>
        <div className="planetSix"/>
        <div className="planetSeven"/>
        <div className="planetEight"/>
        <div className="planetNine"/>
      </div>
    </div>
    }); 
  }
  x++;
}

  render() {
    return (
      <div className="App">
      
        <div className="app__background" />
        {this.state.backgroundColor}
        <header className="App-header">
          {this.state.scores}
          {this.state.timer}
        </header>
        {/* <div className="starsTopLayer" />
        <div className="starsMiddleLayer" /> */}
        {this.state.sentence}
        {this.state.stats}
        {this.state.playButton}
        {this.state.player}
        {this.state.opponents}

      </div>
    );
  }
}

export default App;