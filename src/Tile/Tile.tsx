import React, {FunctionComponent} from 'react';
import styles from './Tile.module.scss';

type TileProps = {
  letter: string;
};

export const Tile: FunctionComponent<TileProps> = ({
                                                       letter
                                                     }) => (
  <div className={letter === '0' ? styles.empty
    : letter === '1' ? styles.dl
      : letter === '2' ? styles.tl
        : letter === '3' ? styles.dw
          : letter === '4' ? styles.tw : styles.tile}>
    {letter !== '0' && letter !== '1' && letter !== '2' && letter !== '3' && letter !== '4' ? letter : ""}
  </div>
);
