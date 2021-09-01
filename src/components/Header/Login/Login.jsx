import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { withAuth } from "../../../hoc/withAuth";

class Login extends React.Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <div>
        <div
          className="btn login-btn btn-success"
          onClick={authActions.toggleLoginModal}
        >
          Войти
        </div>
        <Modal
          isOpen={auth.showLoginModal}
          toggle={authActions.toggleLoginModal}
        >
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default withAuth(Login);
