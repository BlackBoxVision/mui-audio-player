import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { Repeat as LoopStatusIcon, VolumeMute as MuteStatusIcon } from '@material-ui/icons';
import { Slider } from '@material-ui/lab';
import css from 'classnames';
import React, { Fragment } from 'react';
import styles from './styles';
import { attachToEvent, getCurrentTime, getFormattedTime, getIconByPlayerStatus, getPlayerStateFromAction, getProgress, removeFromEvent } from './utils';
import Player from './utils/constants';


export interface AudioPlayerClassNameProps {
  player: string;
  loopIcon: string;
  playIcon: string;
  muteIcon: string;
  slider: string;
  track: string;
  thumb: string;
  text: string;
}

export interface AudioPlayerProps {
  src: string;
  width: string;
  height: string;
  classes: object;
  rounded: boolean;
  autoPlay: boolean;
  elevation: number;
  showLoopIcon: boolean;
  classNames: AudioPlayerClassNameProps;
}

class AudioPlayer extends React.Component<AudioPlayerProps> {
  static displayName = "AudioPlayer";

  static defaultProps = {
    elevation: 1,
    rounded: false,
    classes: {},
    classNames: {},
    width: '500px',
    height: '50px',
    showLoopIcon: true,
  };

  player = null;

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    loopStatus: Player.Status.UNLOOP,
    playStatus: Player.Status.PAUSE,
    muteStatus: Player.Status.UNMUTE,
  };

  componentDidMount() {
    attachToEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

    if (this.props.autoPlay) {
      this.triggerAction(Player.Status.PLAY);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(
        this.player,
        Player.Events.TIME_UPDATE,
        this.handleTimeUpdate
      );
      removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

      this.player = null;
    }
  }

  render() {
    const {
      src,
      rounded,
      elevation,
      classes,
      showLoopIcon,
      classNames: {
        player,
        loopIcon,
        playIcon,
        muteIcon,
        slider,
        track,
        thumb,
        text,
      },
    } = this.props;
    const {
      loopStatus,
      playStatus,
      muteStatus,
      progress,
      current,
      duration,
    } = this.state;

    const PlayStatusIcon = getIconByPlayerStatus(playStatus);

    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;

    return (
      <Fragment>
        <audio
          ref={node => (this.player = node)}
          preload="true"
          controls
          hidden
        >
          <source src={src} />
        </audio>
        <Grid className={css(classes['player-container'], player)} elevation={elevation} rounded={rounded} component={Paper} alignContent="center" justify="center" alignItems="center" spacing={8} container>
          {showLoopIcon && <Grid md={1} item>
            <LoopStatusIcon
              className={css(classes['player-icon-disabled'], loopIcon, {
                [classes['player-default-icon']]: isLoopEnable,
              })}
              onClick={() => this.triggerAction(Player.Status.LOOP)}
              focusable="true"
            />
          </Grid>}
          <Grid md={1} item>
            <PlayStatusIcon
              className={css(
                classes['player-default-icon'],
                classes['player-main-icon'],
                playIcon
              )}
              onClick={() => this.triggerAction(Player.Status.PLAY)}
              focusable="true"
            />
          </Grid>
          <Grid md={1} item>
            <MuteStatusIcon
              className={css(classes['player-icon-disabled'], muteIcon, {
                [classes['player-default-icon']]: isMuteEnable,
              })}
              onClick={() => this.triggerAction(Player.Status.MUTE)}
              focusable="true"
            />
          </Grid>
          <Grid md={2} item>
            <Typography
              className={css(classes['player-text'], text)}
              align="center"
              noWrap
            >
              {getFormattedTime(current)}
            </Typography>
          </Grid>
          <Grid md={5} item>
            <Slider
              onChange={(_, progress) =>
                this.handleChange(progress, this.player)
              }
              classes={{
                root: css(classes['player-slider-container'], slider),
                track: css(classes['player-slider-track'], track),
                thumb: css(classes['player-slider-thumb'], thumb),
              }}
              variant="determinate"
              color="secondary"
              value={progress}
            />
          </Grid>
          <Grid md={2} item>
            <Typography
              className={css(classes['player-text'], text)}
              align="center"
              noWrap
            >
              {getFormattedTime(duration)}
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  triggerAction = action => {
    const newState = getPlayerStateFromAction(this.player, action);

    if (newState) {
      this.setState(newState);
    }
  };

  handleCanPlay = player => {
    attachToEvent(player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);

    this.setState({
      duration: player.duration,
    });
  };

  handleTimeUpdate = player => {
    this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration),
    });
  };

  handleChange = (progress, player) => {
    if (player) {
      const currentTime = getCurrentTime(progress, player.duration);

      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      this.setState({
        progress,
        currentTime,
      });
    }
  };
}

export default withStyles(styles, { withTheme: true })(AudioPlayer);
