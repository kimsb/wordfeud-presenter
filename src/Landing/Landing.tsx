import React, {useEffect, useState} from "react";
import {createRequest, HOST, Method} from "../utils/API";
import {Board} from "../Board/Board";
import {Game, Move} from "../types";

export const Landing = () => {
  const [game, setGame] = useState(defaultGame);
  const [gameId, setGameId] = useState(0);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [startGame, setStartGame] = useState(false);
  const gameIsRunning = false;

  useEffect(() => {

      console.log(`player1: ${player1}, player2: ${player2}`);


    console.log("STARTER USE-EFFECT");
    if (startGame) {
      if (gameId === 0) {
        console.log("startgame = true - kjører invite");
        createRequest(`${HOST}/invite`, Method.POST, {
          inviter: player1,
          invitee: player2
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
            player1: player1
          })
            .then(response => response.json())
            .then(json => {
                console.log(`game-respone: ${json}`);
                setGame(json);
                if (!json.isRunning) {
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
  }, [gameIsRunning, gameId, player1, player2, startGame]);

  return (
    <div>
      <div>
        <input type="text" placeholder={"Player 1"}
               onChange={(change) => setPlayer1(change.target.value)}/>
        <input type="text" placeholder={"Player 2"}
               onChange={(change) => setPlayer2(change.target.value)}/>
        <input type="button" value="Start spill"
          onClick={() => setStartGame(true)}
        />
      </div>
      <div>Player 1: {game.player1Score}</div>
      <div>Player 2: {game.player2Score}</div>
      {game.lastMove && <div>{lastMoveToString(game.lastMove)}</div>}
      {!game.isRunning && <div>{endgame(game, player1, player2)}</div>}
      <Board tiles={game.tiles}/>
    </div>
  );
};

function endgame(game: Game, player1: string, player2: string) {
  if (game.player1Score === game.player2Score) {
    return 'Uavgjort!'
  }
  return `${game.player1Score > game.player2Score ? player1 : player2} vant!`
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
  player1Score: 0,
  player2Score: 0,
  isRunning: true,
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


