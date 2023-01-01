import '../styles/App.css';
import Game from './Game';
import Settings from './Settings';
import { useEffect, useState, useRef } from 'react';
import load_settings from '../utils/load_settings';

function App() {
  const [settingsVisible, setSettingsVisible] = useState(false)

  const isFirstRender = useRef(true)

  // Check user settings on page load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      load_settings()
      return;
    } 
  }, [])

  const toggle_show_settings = () => {
    setSettingsVisible(!settingsVisible)
  }
  
  const CloseSettingsBtn = () => {
    return (
      <div className='close-settings-btn'>
        <button className='navbar-link' onClick={ () => toggle_show_settings() }>X</button>
      </div>
    )
  }

  return (
    <div className="main-content-ctn">
      <div className='navbar-ctn'>
        <div className='navbar-logo'></div>
        {/* Game title */}
        <div className='navbar-link'>
          Memory Blocks
        </div>
        {/* Play (home) */}
        <div className='navbar-link'>
          <a href="#" onClick={ () => setSettingsVisible(false) }>Play</a>
        </div>
        {/* Leaderboard (daily + global) */}
        <div className='navbar-link'>
          <a href="#">Leaderboard</a>
        </div>
        {/* Github repo */}
        <div className='navbar-link'>
          <a href="https://github.com/teavver/memory-blocks">Github</a>
        </div>
         <div className='navbar-link'>
          <a href="#" onClick={ () => toggle_show_settings() }>Settings</a>
        </div>

      </div>
      <div id='main-content'>
          { settingsVisible 
            ?
            <div className='settings-ctn'>
            <CloseSettingsBtn />
            <Settings />
            </div>
            :
            <div className='game-ctn'>
            <Game /> 
            </div>
          }
      </div>
      <div className='footer'>
        teaver @ 2023
      </div>
    </div>
    );
}


export default App;
