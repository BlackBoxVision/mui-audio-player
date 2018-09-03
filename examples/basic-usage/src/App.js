import React from 'react';
import Grid from '@material-ui/core/Grid';

import pink from "@material-ui/core/colors/pink";
import deepPurple from "@material-ui/core/colors/deepPurple";

import createTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { AudioPlayer } from 'mui-audio-player';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: deepPurple,
        secondary: pink
    }
});

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid spacing={16} justify="center" alignContent="center" alignItems="center" container style={{ height: "100vh", backgroundColor: deepPurple["500"] }}>
                    <Grid xs={1} sm={1} md={4} lg={4} item />
                    <Grid xs={10} sm={10} md={4} lg={4} item>
                        <AudioPlayer 
                            src="https://s9.converto.io/download-file/zwXZbmwDyWGN7qkqvVPMcQm0pIajpwdE/file.mp3"
                            autoPlay={false}
                            rounded={true}
                            elevation={1}
                            width="100%"
                        />
                    </Grid>
                    <Grid xs={1} sm={1} md={4} lg={4} item />
                </Grid>
            </React.Fragment>
        );
    }
}
