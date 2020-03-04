import React, {FunctionComponent} from 'react';
import styles from './Board.module.scss';
import {Tile} from "../Tile/Tile";

type BoardProps = {
  tiles: string[][];
};

export const Board: FunctionComponent<BoardProps> = ({
                                                             tiles,
                                                           }) => (
  <div className={styles.boardBox}>
    {tiles.map((line, lineIndex) =>
      line.map((tile, index) =>
        <Tile key={`${lineIndex}${index}`} letter={tile}/>))}
  </div>
);
