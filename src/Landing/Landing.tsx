import React, {useEffect, useState} from "react";
import {createRequest, HOST, Method} from "../utils/API";
import {Board} from "../Board/Board";
import {Game, Move} from "../types";
import styles from './Landing.module.scss';

export const Landing = () => {
  const [game, setGame] = useState(defaultGame);
  const [gameId, setGameId] = useState(0);
  const [inputPlayer1, setInputPlayer1] = useState("");
  const [inputPlayer2, setInputPlayer2] = useState("");
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {

    console.log(`player1: ${inputPlayer1}, player2: ${inputPlayer2}`);


    console.log("STARTER USE-EFFECT");
    if (startGame) {
      if (gameId === 0) {
        (document.getElementById('startButton') as HTMLInputElement).disabled = true;
        console.log("startgame = true - kjører invite");
        createRequest(`${HOST}/invite`, Method.POST, {
          inviter: inputPlayer1,
          invitee: inputPlayer2
        })
          .then(response => response.json())
          .then(json => {
            console.log(`invite-respone: ${json}`);
            setGameId(json.gameId)
          });
      }

      if (gameId !== 0) {
        const interval = setInterval(() => {
          console.log("KJØRER INTERVAL");
          createRequest(`${HOST}/game`, Method.POST, {
            gameId: gameId,
            player1: inputPlayer1
          })
            .then(response => response.json())
            .then(json => {
                console.log(`game-respone: ${json}`);
                setGame(json);
                if (!json.isRunning) {
                  (document.getElementById('startButton') as HTMLInputElement).disabled = false;
                  console.log("gameIsNotRunning, should break out of set interval");
                  console.log("setter startgame -> false og gameId -> 0");
                  setStartGame(false);
                  setGameId(0);
                  clearInterval(interval);
                }
              }
            );

        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [gameId, inputPlayer1, inputPlayer2, startGame]);

  return (
    <div>
      <div className={styles.inputContainer}>
        <input className={styles.textInput} type="text" placeholder={"Player 1"}
               onChange={(change) => setInputPlayer1(change.target.value)}/>
        <input className={styles.textInput} type="text" placeholder={"Player 2"}
               onChange={(change) => setInputPlayer2(change.target.value)}/>
        <button className={styles.startButton} id={'startButton'} onClick={() => setStartGame(true)}>
          Start spill
        </button>
      </div>
      <Board tiles={game.tiles} lastMove={game.lastMove}/>
      <div className={styles.bottomInfo}>{game.player1Score} - {game.player2Score}</div>
      {game.isRunning && game.lastMove && <div className={styles.bottomInfo}>{lastMoveToString(game.lastMove)}</div>}
      {!game.isRunning && <div className={styles.bottomInfo}>{endgame(game)}</div>}
    </div>
  );
};

function endgame(game: Game) {
  if (game.gameId === 0) {
    return ''
  } else if (game.player1Score === game.player2Score) {
    return 'Uavgjort!'
  }
  return `${game.player1Score > game.player2Score ? game.player1 : game.player2} vant!`
}

function lastMoveToString(lastMove: Move) {
  switch (lastMove.moveType) {
    case 'move':
      return `${lastMove.player} la ${lastMove.word} for ${lastMove.points} poeng`;
    case 'pass':
      return `${lastMove.player} passet`;
    case 'swap':
      return `${lastMove.player} byttet brikker`;
    default:
      return `${lastMove.player} ga opp`;
  }
}

const defaultGame: Game = {
  gameId: 0,
  player1: "Player1",
  player2: "Player2",
  player1Score: 0,
  player2Score: 0,
  isRunning: false,
  tiles: [
    ['2', '0', '0', '0', '4', '0', '0', '1', '0', '0', '4', '0', '0', '0', '2'],
    ['0', '1', '0', '0', '0', '2', '0', '0', '0', '2', '0', '0', '0', '1', '0'],
    ['0', '0', '3', '0', '0', '0', '1', '0', '1', '0', '0', '0', '3', '0', '0'],
    ['0', '0', '0', '2', '0', '0', '0', '3', '0', '0', '0', '2', '0', '0', '0'],
    ['4', '0', '0', '0', '3', '0', '1', '0', '1', '0', '3', '0', '0', '0', '4'],
    ['0', '2', '0', '0', '0', '2', '0', '0', '0', '2', '0', '0', '0', '2', '0'],
    ['0', '0', '1', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1', '0', '0'],
    ['1', '0', '0', '3', '0', '0', '0', '0', '0', '0', '0', '3', '0', '0', '1'],
    ['0', '0', '1', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1', '0', '0'],
    ['0', '2', '0', '0', '0', '2', '0', '0', '0', '2', '0', '0', '0', '2', '0'],
    ['4', '0', '0', '0', '3', '0', '1', '0', '1', '0', '3', '0', '0', '0', '4'],
    ['0', '0', '0', '2', '0', '0', '0', '3', '0', '0', '0', '2', '0', '0', '0'],
    ['0', '0', '3', '0', '0', '0', '1', '0', '1', '0', '0', '0', '3', '0', '0'],
    ['0', '1', '0', '0', '0', '2', '0', '0', '0', '2', '0', '0', '0', '1', '0'],
    ['2', '0', '0', '0', '4', '0', '0', '1', '0', '0', '4', '0', '0', '0', '2']
  ],
  lastMove: null
};


