import './Bar.css';
import logo from './logo.png'; 

const Bar = ({ onTitleClick, onLogoClick }) => {
  return (
    <nav className="bar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={onLogoClick}
        style={{ cursor: 'pointer' }}
      />
      <h1 className="title" onClick={onTitleClick} style={{ cursor: 'pointer' }}>
        Chat With Us
      </h1>
    </nav>
  );
};

export default Bar;
