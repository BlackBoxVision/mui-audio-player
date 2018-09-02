export const createMockedPlayer = ({ loop = false, muted = false, paused = true }) => ({
    loop,
    muted,
    paused,
    play: () => {},
    pause: () => {},
});