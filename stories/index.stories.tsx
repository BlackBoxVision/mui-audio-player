import { createMuiTheme, Grid, MuiThemeProvider } from '@material-ui/core';
import { deepPurple, pink } from '@material-ui/core/colors';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { AudioPlayer } from '../src';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: pink,
  },
});

storiesOf('MUIAudioPlayer', module).add('MUIAudioPlayer', () => (
  <MuiThemeProvider theme={theme}>
    <Grid
      spacing={16}
      justify="center"
      alignContent="center"
      alignItems="center"
      container
      style={{ backgroundColor: '#e0e0e0' }}
    >
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
  </MuiThemeProvider>
));
