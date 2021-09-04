import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withAuth } from "../../hoc/withAuth";
import CallApi from "../../api/api";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  state = { dropdownOpen: false };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.auth.session_id,
      },
    }).then(() => {
      this.props.authActions.onLogOut();
    });
  };

  render() {
    const { auth } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${auth.user.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className="dropdown-item-user-menu-btn">
            <Link to="/account/favorites" className="user-menu-btn">
              Избранные
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={this.handleLogOut}
            className="dropdown-item-user-menu-btn"
          >
            <Link to="/" className="user-menu-btn">
              Выйти
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withAuth(UserMenu);
