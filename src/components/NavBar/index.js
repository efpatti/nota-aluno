import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">SESI</div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <ul className="nav-list">
        <li>
          <a href="google.com">Início</a>
        </li>
        <li>
          <a href="google.com">Conta</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
