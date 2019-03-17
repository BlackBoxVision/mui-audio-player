import {
  PauseCircleFilled as PauseIcon,
  PlayCircleFilled as PlayIcon,
} from '@material-ui/icons';
import Player from './constants';

export * from './actions';
export * from './events';

export const appendZero = number => (number < 10 ? `0${number}` : number);

export const getFormattedTime = time => {
  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);

  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());

  return `${dateTimeM}:${dateTimeS}`;
};

export const getIconByPlayerStatus = playerStatus => {
  switch (playerStatus) {
    case Player.Status.PAUSE:
      return PlayIcon;
    case Player.Status.PLAY:
    default:
      return PauseIcon;
  }
};

export const getProgress = (currentTime, duration) =>
  parseFloat(100 * (currentTime / duration));

export const getCurrentTime = (progress, duration) =>
  parseFloat((progress * duration) / 100);
