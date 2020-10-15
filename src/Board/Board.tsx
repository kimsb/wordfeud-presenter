import React, {FunctionComponent} from 'react';
import styles from './Board.module.scss';
import {Tile} from "../Tile/Tile";
import {Move} from "../types";

type BoardProps = {
  tiles: string[][];
  lastMove: Move | null
};

export const Board: FunctionComponent<BoardProps> = ({
                                                       tiles,
                                                       lastMove
                                                     }) => (
  <div className={styles.boardContainer}>
    <div className={styles.boardBox}>
      {tiles.map((line, lineIndex) =>
        line.map((tile, index) =>
          <Tile key={`${lineIndex}${index}`} letter={tile} wasPlacedLastMove={tileWasPlacedLastMove(lineIndex,index,lastMove)}/>))}
    </div>
  </div>
);

function tileWasPlacedLastMove(x: number, y: number, lastMove: Move | null) {
  if (lastMove?.moveType === 'move') {
    return lastMove.letterPlacements
      .filter(coordinate => coordinate.y === x && coordinate.x === y) //tydeligvis transposed et eller annet sted
      .length > 0
  } else
    return false
}
