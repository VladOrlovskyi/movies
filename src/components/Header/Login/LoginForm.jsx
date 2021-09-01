import React from "react";
import CallApi from "../../../api/api";
import validateFields from "./validate";
import Field from "./Field";
import { withAuth } from "../../../hoc/withAuth";
import classNames from "classnames";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      values: {
        username: "",
        password: "",
      },
      errors: {},
      submitting: false,
    };
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }));
  };

  handleBlur = () => {
    console.log("on blur");
    const errors = validateFields(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  onSubmit = () => {
    const {
      values: { username, password },
    } = this.state;

    let session_id = null;
    this.setState({
      submitting: true,
    });

    CallApi.get("/authentication/token/new")
      .then((data) => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username,
            password,
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        session_id = data.session_id;
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id,
          },
        });
      })
      .then((user) => {
        this.setState(
          {
            submitting: false,
          },
          () => {
            this.props.authActions.updateAuth({ user, session_id });
            this.props.authActions.toggleLoginModal();
          }
        );
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = validateFields(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  getClassForInput = (key) =>
    classNames("form-control", {
      invalid: this.state.errors[key],
    });

  render() {
    const {
      values: { username, password },
      errors,
      submitting,
    } = this.state;

    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <Field
            id="username"
            labelText="Пользователь"
            type="text"
            placeholder="Пользователь"
            name="username"
            value={username}
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            error={errors.username}
          />
          <Field
            id="password"
            labelText="Пароль"
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            error={errors.password}
          />
          <button
            type="submit"
            className=" btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
export default withAuth(LoginForm);
