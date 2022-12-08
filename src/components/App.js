import '../styles/App.css';
import Game from './Game';

function App() {
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
          <a href="">Play</a>
        </div>
        {/* Leaderboard (daily + global) */}
        <div className='navbar-link'>
          <a href="">Leaderboard</a>
        </div>
        {/* Github repo */}
        <div className='navbar-link'>
          <a href="https://github.com/teavver/memory-blocks">Github</a>
        </div>
      </div>
      <div id='main-content'>
        <div className='game-ctn'>
          <Game />
        </div>
      </div>
    </div>
    );
}

export default App;
