// src/components/LyricsPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import songsData from "../data/songs.json";

function LyricsPage() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="lyrics-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/lyrics" className="nav-link">Letras</Link>
        <Link to="/quiz" className="nav-link">Quiz</Link>
      </nav>

      <div className="content">
        {!selectedSong ? (
          <div>
            <h1 className="page-title">Letras</h1>
            <ul className="song-list">
              {songsData.map((song, index) => (
                <li 
                  key={index} 
                  className="song-item"
                  onClick={() => setSelectedSong(song)}
                >
                  <h2 className="song-title">{song.title}</h2>
                  <p className="song-info">{song.album} - {song.year}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="song-detail">
            <button 
              className="back-button"
              onClick={() => setSelectedSong(null)}
            >
              Voltar
            </button>
            <h2 className="song-title-detail">{selectedSong.title}</h2>
            <p className="song-info-detail">{selectedSong.album} - {selectedSong.year}</p>
            <pre className="song-lyrics">
              {Array.isArray(selectedSong.lyrics) 
                ? selectedSong.lyrics.join("\n") 
                : selectedSong.lyrics}
            </pre>
          </div>
        )}
      </div>
      <style jsx>{`
        .lyrics-container {
          min-height: 100vh;
          background: radial-gradient(
    circle at 50% 50%,
    #ff9ca7 0%,    /* rosa avermelhado (centro) */
    #ffd3e1 30%,   /* tom mais claro rosado */
    #b7e6ff 60%,   /* azul clarinho */
    #90c8ff 100%   /* azul mais forte */
  );
  
          font-family: 'Outfit', sans-serif;
          color: white;
          padding: 2rem;
          position: relative;

          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .navbar {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .nav-link {
          text-decoration: none;
          color: white;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #ffef00;
          text-shadow: 0 0 5px #ffef00;
        }
        .content {
          max-width: 800px;
          margin: 0 auto;
        }
        .page-title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 2rem;
          text-shadow: 0 0 10px rgba(255, 239, 0, 0.8);
        }
        .song-list {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 1.5rem;
        }
        .song-item {
          background: rgba(255, 255, 255, 0.5); 
            color: #fff; 
          padding: 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: 2px solid transparent;
        }
        .song-item:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.02);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .song-title {
          font-size: 2rem;
          margin: 0;
        }
        .song-info {
          font-size: 1rem;
        }
        .song-detail {
          text-align: center;
        }
        .back-button {
          background: #04c8de;
          border: none;
          padding: 0.8rem 1.2rem;
          color: white;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 8px #04c8de;
          transition: background 0.3s;
        }
        .back-button:hover {
          background: #03a0b5;
        }
        .song-title-detail {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .song-info-detail {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .song-lyrics {
          background: white;
          color: black;
          padding: 1rem;
          border-radius: 8px;
          text-align: left;
          white-space: pre-wrap;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}

export default LyricsPage;
