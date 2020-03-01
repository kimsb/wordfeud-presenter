import React, {useEffect, useState} from "react";
import {createRequest, HOST, Method} from "../utils/API";

export const Landing = () => {
  const [game, setGame] = useState({});

  useEffect(() => {
    createRequest(`${HOST}/game`, Method.POST, {
      player1: "moomin85",
      player2: "moominbot"
    })
      .then(response => response.json())
      .then(json => {
          console.log(`json-respone: ${json}`);
          setGame(json)
        }
      )

  }, []);

  return (
    <div>
      <h1>Her kommer et game</h1>
    </div>
  );
};
