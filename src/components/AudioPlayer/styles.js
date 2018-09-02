import { lighten } from "@material-ui/core/styles/colorManipulator";

const getColor = (theme, type, opacity) => {
    const color =
        theme.palette[type][theme.palette.type === "light" ? "main" : "dark"];

    if (!opacity) {
        return color;
    }

    return lighten(color, opacity);
};

const getGreyColor = (theme, opacity) => {
    const greyColor = theme.palette.grey["500"];

    if (!opacity) {
        return greyColor;
    }

    return lighten(greyColor, opacity);
};

export default theme => ({
    "player-grid-container": {
        "background-color": theme.palette.background.default,
        "text-align": "center",
        margin: "0px",
        padding: "4px"
    },
    "player-default-icon": {
        padding: "0px",
        margin: "0px",
        width: "27px",
        height: "27px",
        fill: `${getColor(theme, "primary")} !important`,
        color: `${getColor(theme, "primary")} !important`,
        "&:hover": {
            fill: `${getColor(theme, "primary", 0.25)} !important`,
            color: `${getColor(theme, "primary", 0.25)} !important`
        }
    },
    "player-icon-disabled": {
        padding: "0px",
        margin: "0px",
        width: "27px",
        height: "27px",
        fill: getGreyColor(theme),
        color: getGreyColor(theme),
        "&:hover": {
            fill: getGreyColor(theme, 0.25),
            color: getGreyColor(theme, 0.25)
        }
    },
    "player-main-icon": {
        width: "40px",
        height: "40px",
        fill: `${getColor(theme, "secondary")} !important`,
        color: `${getColor(theme, "secondary")} !important`,
        "&:hover": {
            fill: `${getColor(theme, "secondary", 0.25)} !important`,
            color: `${getColor(theme, "secondary", 0.25)} !important`
        }
    },
    "player-slider-container": {
        width: "auto !important",
        "border-radius": "4px",
        "padding-top": "20px",
        height: "9px"
    },
    "player-slider-track": {
        "background-color": getColor(theme, "primary")
    },
    "player-slider-thumb": {
        "background-color": getColor(theme, "secondary")
    },
    "player-text": {
        color: theme.palette.getContrastText(theme.palette.background.default),
        "margin-top": "10px"
    }
});