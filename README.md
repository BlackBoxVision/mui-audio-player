# MUI Audio Player

Material-UI based Audio Player.

## Installation

You can install this library via `NPM` or `YARN`.

### NPM 

```bash
npm i mui-audio-player
```

### YARN 

```bash
yarn add mui-audio-player
```

### Usage

You can check it out the [basic usage example](https://github.com/BlackBoxVision/mui-audio-player/tree/master/examples/basic-usage). Or: 

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

As you can see in the example, this component is pretty well themeable.


## Props

These are the properties used by the `AudioPlayer` component:

| Properties    | Types         | Default Value         | Description   |
| ------------- | ------------- | ------------- | ------------- |
| src  | string  | none | Determines the url used by the player to load the audio source.             | 
| autoPlay  | boolean  | false  |  Determines if the player starts reproducing the audio automatically.           |
| rounded  | boolean  | false |    Determines if the player container has rounded borders.         |
| elevation  | number  | 1 |      Determines if the player container has box-shadow applied.              |
| width  | string  |  500px |  Determines the width of the player.                |
| height  | string  | 45px |   Determines the height of the player.           |
| classNames  | object  | {} |  Determines the classNames to be applied. (*)          |

(*) `classNames` is a special property:

| Properties    | Types         | keys         | Description   |
| ------------- | ------------- | ------------- | ------------- |
| classNames.player  | string  | none |  Determines the className to be applied to the root container.          |
| classNames.loopIcon  | string  | none |  Determines the classNames to be applied to the loop icon element.         |
| classNames.playIcon  | string  | none |  Determines the classNames to be applied to the play icon element.        |
| classNames.muteIcon  | string  | none |  Determines the classNames to be applied to the mute icon element.         |
| classNames.slider  | string  | none |  Determines the classNames to be applied to the slider element.         |
| classNames.track  | string  | none |  Determines the classNames to be applied to the track element.        |
| classNames.thumb  | string  | none |  Determines the classNames to be applied to the thumb element.          |
| classNames.text  | string  | none |  Determines the classNames to be applied to the text element.          |

## TODO

- Add `volume bar`.
- Add more tests.

## Issues

If you found a bug, or you have an answer, or whatever. Please, open an [issue](https://github.com/BlackBoxVision/mui-audio-player/issues/new). We will do our best to fix it.

## Contributing

Of course, if you see something that you want to upgrade from this library, or a bug that needs to be solved, PRs are welcome!

## License

Distributed under the MIT license. See [LICENSE](https://github.com/BlackBoxVision/mui-audio-player/blob/master/LICENSE) for more information.