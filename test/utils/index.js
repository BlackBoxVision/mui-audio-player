export const createMockedPlayer = ({ loop = false, muted = false, paused = true }) => {
    const player = {
        loop,
        muted,
        paused,
        play: () => {
            player.paused = false;
        },
        pause: () => {
            player.paused = true;
        },
    };

    return player;
};