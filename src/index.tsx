import './style/global.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from '@/pages/layout';
import { GlobalContext } from './context';
// import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={contextValue}>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
