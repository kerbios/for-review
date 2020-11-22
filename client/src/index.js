import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import reducers from './reducers';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

let chatTheme = createMuiTheme({
  palette: {
      primary: {
          main: purple[500],
      },
      secondary: {
          main: red[500],
      },
      overrides: {
        Button: {
          color: 'white',
        },
      }
  },
});

chatTheme = responsiveFontSizes(chatTheme);

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={chatTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
