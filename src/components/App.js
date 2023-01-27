import '../styles/app.css';
import "../styles/variables.css";
import Game from './Game';
import Settings from './Settings';
import Leaderboard from './Leaderboard';
import Heatmaps from './Heatmaps';
import updt_css_var from '../utils/updt_css_var';
import check_setting from '../utils/check_setting';
import load_settings from '../utils/load_settings';
import { tile_colors } from '../utils/tile_colors';
import { useEffect, useState, useRef } from 'react';

function App() {

  // States
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [heatmapsVisible, setHeatmapasVisible] = useState(false)
  const [triggerGameReset, setTriggerGameReset] = useState(false)

  // LocalStorage
  const user_id = localStorage.getItem("USER_ID")

  // Ref
  let isFirstRender = useRef(true)

  // Check user settings on page load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      load_settings()

      if(check_setting("TILE_COLOR_ID") === true){
        const color_id = localStorage.getItem("TILE_COLOR_ID")
        const settings_user_color = tile_colors[color_id]
        updt_css_var("--tile_color", settings_user_color)
      }

      return;
    } 
  }, [])

  const CloseSettingsBtn = () => {
    return (
      <div className='close-settings-btn-ctn'>
        <button className='navbar-link'
        onClick={ () => {
          setTriggerGameReset(true)
          setSettingsVisible(false)
        }}> X </button>
      </div>
    )
  }

  const openInNewTab = (url) => {
    // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
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

          {/* (LINK) Play (home) */}
          <div className='navbar-link'>
            <p className='link monospace bold' onClick={ () => {
              setTriggerGameReset(true)
              setSettingsVisible(false)
              setLeaderboardVisible(false)
              setHeatmapasVisible(false)
            }}> Play </p>
          </div>

          {/* (LINK) Leaderboard (daily + global) */}
          <div className='navbar-link'>
            <p className='link monospace bold' onClick={ () => {
              setTriggerGameReset(true)
              setLeaderboardVisible(true)
              setSettingsVisible(false)
              setHeatmapasVisible(false)
            }}> Leaderboard </p>
          </div>

          {/* (LINK) Heatmap (for local user) */}
          <div className='navbar-link'>
            <p className='link monospace bold' onClick={() => {
              setTriggerGameReset(true)
              setHeatmapasVisible(true)
              setLeaderboardVisible(false)
              setSettingsVisible(false)
            }}> Heatmap </p>
          </div>


          {/* (LINK) Settings */}
          <div className='navbar-link'>
            <p className='link monospace bold' onClick={ () => {
              setTriggerGameReset(true)
              setSettingsVisible(true)
              setLeaderboardVisible(false)
              }}> Settings </p>
            </div>

          {/* (LINK) Github repo */}
          <div className='navbar-link'>
            <p className='link monospace bold'
            onClick={
              () => openInNewTab("https://github.com/teavver/memory-blocks")}>Github</p>
          </div>

        {/* ACCOUNTS SOON */}
        {/* <div className='navbar-ctn-right'>
          <div className='navbar-link hidden'>
          <p onClick={ () => console.log('login') }> Login </p>
          </div>
          <div className='navbar-link hidden'>
          <p onClick={ () => console.log('register') }>Register</p>
          </div>
        </div> */}
        </div>
      </div>

      <div id='main-content'>
        { leaderboardVisible
        ?
        <div className='leaderboard-ctn'>
        <Leaderboard />
        </div>
        :
          settingsVisible 
            ?
            <div className='settings-ctn'>
            <CloseSettingsBtn />
            <Settings />
            </div>
            :
              heatmapsVisible ?
                <div className='heatmaps-ctn'>
                <Heatmaps />
                </div>
              :
                <>
                <div className='game-ctn'>
                <Game triggerGameReset={triggerGameReset} /> 
                </div>
                </>
        }
      </div>
      <div className='footer'>
        teaver @ 2023 | player id: {user_id}
      </div>
    </div>
    );
}


export default App
