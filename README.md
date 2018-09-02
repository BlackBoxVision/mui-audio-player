# MUI Audio Player

Material-UI based Audio Player.

## Installation

You can install this library via NPM or YARN.

### NPM 

```bash
npm i mui-audio-player
```

### YARN 

```bash
yarn add mui-audio-player
```

## Properties

| Properties    | Types         | Description   |
| ------------- | ------------- | ------------- |
| src  | string  | Determines the url used by the player to load the audio source.             | 
| autoPlay  | boolean  |    Determines if the player starts reproducing the audio automatically.           |
| rounded  | boolean  |      Determines if the player container has rounded borders.         |
| elevation  | number  |      Determines if the player container has box-shadow applied.              |
| width  | string  |    Determines the width of the player.                |
| height  | string  |    Determines the height of the player.           |
| classNames  | object  |    Determines the classNames to be applied. (*)          |


### Usage

You can check it out the basic usage example. Or: 

```javascript
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
            <ThemeProvider theme={theme}>
                <Grid justify="center" alignContent="center" alignItems="center" container style={{ height: "100vh", backgroundColor: deepPurple["500"] }}>
                    <Grid md={4} item />
                    <Grid md={4} item>
                        <AudioPlayer 
                            src="https://s9.converto.io/download-file/zwXZbmwDyWGN7qkqvVPMcQm0pIajpwdE/file.mp3"
                            autoPlay={false}
                            rounded={true}
                            elevation={1}
                            width="100%"
                        />
                    </Grid>
                    <Grid md={4} item />
                </Grid>
            </ThemeProvider>
        );
    }
}
```