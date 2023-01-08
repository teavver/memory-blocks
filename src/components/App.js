import '../styles/app.css';
import "../styles/variables.css";
import Game from './Game';
import Score from './Score';
import Settings from './Settings';
import { tile_colors } from '../utils/tile_colors';
import updt_css_var from '../utils/updt_css_var';
import check_setting from '../utils/check_setting';
import load_settings from '../utils/load_settings';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [settingsVisible, setSettingsVisible] = useState(false)

  const isFirstRender = useRef(true)

  // Check user settings on page load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      load_settings()
      if(check_setting("TILE_COLOR_ID") === true){
        const color_id = localStorage.getItem("TILE_COLOR_ID")
        const settings_user_color = tile_colors[color_id]
        updt_css_var("--tile_color",settings_user_color)
      }
      return;
    } 
  }, [])

  const toggle_show_settings = () => {
    setSettingsVisible(!settingsVisible)
  }
  
  const CloseSettingsBtn = () => {
    return (
      <div className='close-settings-btn-ctn'>
        <button className='navbar-link' onClick={ () => toggle_show_settings() }>X</button>
      </div>
    )
  }

  return (
    <div className="main-content-ctn">
      <div className='navbar-ctn'>
        <div className='navbar-ctn-left'>
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
        <div className='navbar-ctn-right'>
          <div className='navbar-link hidden'>
            <a href="#" onClick={ () => console.log('login') }>Login</a>
          </div>
          <div className='navbar-link hidden'>
            <a href="#" onClick={ () => console.log('register') }>Register</a>
          </div>
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
            <>
            <div className='game-ctn'>
            <Game /> 
            </div>
            </>
          }
      </div>
      <div onClick={ () => console.log(123333)} className='footer'>
        teaver @ 2023
      </div>
    </div>
    );
}


export default App;
