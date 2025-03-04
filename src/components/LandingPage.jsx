// src/components/LandingPage.jsx
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/lyrics" className="nav-link">Letras</Link>
        <Link to="/quiz" className="nav-link">Quiz</Link>
      </nav>
      {/* Conteúdo Central */}
      <div className="landing-content">
        <h1 className="landing-title">Lifetimes Tour Prep</h1>
      </div>
      {/* Estilos inline para reforçar a identidade visual */}
      <style jsx>{`
        .landing-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(
    circle at 50% 50%,
    #ff9ca7 0%,    /* rosa avermelhado (centro) */
    #ffd3e1 30%,   /* tom mais claro rosado */
    #b7e6ff 60%,   /* azul clarinho */
    #90c8ff 100%   /* azul mais forte */
  );
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
          font-family: 'Outfit', sans-serif;
          color: #F8F8F8;
          position: relative;
          overflow: hidden;
        }
        /* Animação de partículas simulada (exemplo simples) */
        .landing-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .navbar {
          position: absolute;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding: 1rem;
          z-index: 10;
        }
        .nav-link {
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          color: white;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #ffef00;
          text-shadow: 0 0 5px #ffef00;
        }
        .landing-content {
          z-index: 5;
          text-align: center;
        }
        .landing-title {
          font-size: 4rem;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}

export default LandingPage;

/* Exemplo de um radial gradient com 3-4 cores */
