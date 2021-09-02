import React from "react";
import UserMenu from "./UserMenu";
import { withAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import Login from "./Login/Login";

class Header extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/movies">
                <span>MOVIES</span>
              </Link>
            </li>
          </ul>
          {auth.user ? <UserMenu /> : <Login />}
        </div>
      </nav>
    );
  }
}
export default withAuth(Header);
