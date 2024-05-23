import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);




  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/vector.png" alt="" />
          <span style={{ color: "#0061E0" }}>EstateTopia</span>
        </a>
        <a href="/">Home</a>
        <a href="/list?estateType=buy">Buy</a>
        <a href="/list?estateType=rent">Rent</a>
        <a href="/estimate">Estimate</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" style={{ color: "#0061E0" }}>
              Sign in
            </a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/list?estateType=buy">Buy</a>
          <a href="/list?estateType=rent">Rent</a>
          <a href="/estimate">Estimate</a>
          {currentUser && <a href="/profile">Profile</a>}
          {!currentUser && <a href="/login">Sign in</a>}
          {!currentUser && <a href="/register">Sign up</a> }


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
