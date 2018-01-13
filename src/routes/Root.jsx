import React from 'react';
import {Route} from 'react-router';
import About from '../components/About/About';
import Main from '../components/Main';

import style from './style.scss';

export default class Root extends React.Component {

  render() {
    return (
      <div className={style.root}>
        <Route path="/" component={About} />

      </div>
    )
  }


}
