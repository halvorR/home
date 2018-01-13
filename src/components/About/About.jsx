import React, {Component} from 'react';
import style from './style.scss';

import profilePic from '../../static/images/profil2.png'
class About extends Component {

    render () {

        return (
          <div className={style.container}>
            <div className={style.imgCont}>
              <img src={profilePic} alt="Profilbilde" className={style.picture} />
            </div>
            <h1>Halvor Rønneseth</h1>
          <div className={style.cont}>
            <h4>Who am I?</h4>
            <p>I'm a Software engineer at Capgemini Norge, with a focus on frontend & mobile. I've got a bachelors degree from HiOA in Applied Computer Technologies, pluss another bachelors degree as a P.E-teacher.</p>
          </div>
          <div className={style.cont}>
            <h4>What am I doing?</h4>
            <p>Currently I'm working with React, and so far I'm diggin' it!</p>
          </div>
          <div className={style.cont}>
            <h4>What have I done?</h4>
            <p>Well, currently I've only done one major project, and thats my bachelors assignment in Applied Computer Technology</p>
          </div>
          <div className={style.cont}>
            <h4>How you can reach me?</h4>
              <ul>
                <li>Mobile: +4797567509</li>
                <li>Email: <a href="mailto:halvorr91@gmail.com">halvorr91@gmail.com</a></li>
              </ul>
          </div>
        </div>
        );
    }
}

export default About;
