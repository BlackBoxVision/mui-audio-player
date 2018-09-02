import React from "react";
import css from "classnames";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import JssProvider from 'react-jss/lib/JssProvider';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

import LoopStatusIcon from "@material-ui/icons/Repeat";
import MuteStatusIcon from "@material-ui/icons/VolumeMute";

import {
    getPlayerStateFromAction,
    getIconByPlayerStatus,
    getFormattedTime,
    removeFromEvent,
    getCurrentTime,
    attachToEvent,
    getProgress,
} from "./utils";

import Player from './utils/constants';

import styles from "./styles";

const generateClassName = createGenerateClassName({
    productionPrefix: 'mui-player',
    dangerouslyUseGlobalCSS: false,
});

class AudioPlayer extends React.PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired,
        width: PropTypes.string,
        height: PropTypes.string,
        rounded: PropTypes.bool,
        classes: PropTypes.object,
        elevation: PropTypes.number,
        classNames: PropTypes.shape({
            player: PropTypes.string,
            loopIcon: PropTypes.string,
            playIcon: PropTypes.string,
            muteIcon: PropTypes.string,
            slider: PropTypes.string,
            track: PropTypes.string,
            thumb: PropTypes.string,
            text: PropTypes.string
        })
    };

    static defaultProps = {
        elevation: 1,
        rounded: false,
        classes: {},
        classNames: {},
        width: "500px",
        height: "50px"
    };

    state = {
        current: 0,
        progress: 0,
        duration: 0,
        loopStatus: Player.Status.UNLOOP,
        playStatus: Player.Status.PAUSE,
        muteStatus: Player.Status.UNMUTE
    };

    componentDidMount() {
        attachToEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

        if (this.props.autoPlay) {
            this.triggerAction(Player.Status.PLAY);
        }
    }

    componentWillUnmount() {
        if (this.player) {
            removeFromEvent(this.player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);
            removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

            this.player = null;
        }
    }

    render() {
        const { rounded, width, height, src, elevation, classes, classNames: { player, loopIcon, playIcon, muteIcon, slider, track, thumb, text } } = this.props;
        const { loopStatus, playStatus, muteStatus, progress, current, duration } = this.state;

        const PlayStatusIcon = getIconByPlayerStatus(playStatus);

        const isLoopEnable = loopStatus === Player.Status.LOOP;
        const isMuteEnable = muteStatus === Player.Status.MUTE;

        return (
            <JssProvider generateClassName={generateClassName}>
                <>
                    <audio
                        ref={node => (this.player = node)}
                        controls="true"
                        preload="true"
                        hidden="true"
                    >
                        <source src={src} />
                    </audio>
                    <Paper
                        className={css(classes["player-grid-container"], player)}
                        elevation={elevation}
                        square={!rounded}
                        style={{
                            width,
                            height
                        }}
                    >
                        <Grid alignItems="center" justify="center" spacing={0} container>
                            <Grid xs={1} item>
                                <LoopStatusIcon
                                    className={css(classes["player-icon-disabled"], loopIcon, { [classes["player-default-icon"]]: isLoopEnable })}
                                    onClick={() => this.triggerAction(Player.Status.LOOP)}
                                    focusable="true"
                                />
                            </Grid>
                            <Grid xs={1} item>
                                <PlayStatusIcon
                                    className={css(classes["player-default-icon"], classes["player-main-icon"], playIcon)}
                                    onClick={() => this.triggerAction(Player.Status.PLAY)}
                                    focusable="true"
                                />
                            </Grid>
                            <Grid xs={1} item>
                                <MuteStatusIcon
                                    className={css(classes["player-icon-disabled"], muteIcon, { [classes["player-default-icon"]]: isMuteEnable })}
                                    onClick={() => this.triggerAction(Player.Status.MUTE)}
                                    focusable="true"
                                />
                            </Grid>
                            <Grid xs={9} item>
                                <Grid justify="center" spacing={0} direction="row" container>
                                    <Grid xs={2} item>
                                        <Typography
                                            className={css(classes["player-text"], text)}
                                            align="center"
                                            gutterBottom
                                            noWrap
                                        >
                                            {getFormattedTime(current)}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={8} item>
                                        <Slider
                                            onChange={(_, progress) => this.handleChange(progress, this.player)}
                                            classes={{
                                                root: css(classes["player-slider-container"], slider),
                                                track: css(classes["player-slider-track"], track),
                                                thumb: css(classes["player-slider-thumb"], thumb),
                                            }}
                                            variant="determinate"
                                            color="secondary"
                                            value={progress}
                                        />
                                    </Grid>
                                    <Grid xs={2} item>
                                        <Typography
                                            className={css(classes["player-text"], text)}
                                            align="center"
                                            gutterBottom
                                            noWrap
                                        >
                                            {getFormattedTime(duration)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            </JssProvider>
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
            duration: player.duration
        });
    };

    handleTimeUpdate = player => {
        this.setState({
            current: player.currentTime,
            progress: getProgress(player.currentTime, player.duration)
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
                currentTime
            });
        }
    };
}

export default withStyles(styles, { withTheme: true })(AudioPlayer);
