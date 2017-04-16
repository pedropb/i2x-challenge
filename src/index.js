import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
);
