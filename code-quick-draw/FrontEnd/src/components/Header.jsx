import { Link } from "react-router-dom"

export const Header = () => {
  return (
  <div>
    <div className="banner">
        <img className="logo" src="images/CodeQuickdrawLogo.png" alt="NutriSync Logo" />
      </div>
      <div className="buttonRow fade-in">
        <button className="submit">
          <Link className="link" to="/">Home</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/play">Play</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/about">About Us</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/contacts">Contacts</Link>
        </button>
        <button className='submit'>
          <Link className="link" id="link" to="/temp-play-page">
            Test
          </Link>
        </button>
        <button className='submit'>
          <Link className="link" id="link" to="/leaderboard">
            Leaderboard
          </Link>
        </button>
      </div>
    </div>
  );
}