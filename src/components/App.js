import '../styles/App.css';
import Game from './Game';

function App() {
  return (
    <div className="main-content-ctn">
      <div className='navbar-ctn'>
        <div className='navbar-logo'></div>
        <div className='navbar-link'>
          Memory Blocks
        </div>
        <div className='navbar-link'>
          <a href="">Play</a>
        </div>
        <div className='navbar-link'>
          <a href="">Leaderboard</a>
        </div>
        <div className='navbar-link'>
          <a href="https://github.com/teavver/memory-blocks">Github</a>
        </div>
      </div>
      <div className='main-content'>
        <div className='game-ctn'>
          <Game />
        </div>
      </div>
    </div>
    );

}

export default App;
