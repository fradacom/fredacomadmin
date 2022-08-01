import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert, Checkbox, Popover } from "antd";
import PropTypes from "prop-types";
import {
  showLoading,
  showAuthMessage,
  hideLoading,
  authenticated,
  hideAuthMessage,
} from "redux/actions/Auth";
import JwtAuthService from "services/JwtAuthService";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from 'configs/AppConfig';
import { AUTH_TOKEN, REDIRECT_PATH, REFRESH_TOKEN } from 'redux/constants/Auth';
import handleErrors from 'services/handleErrors';

const rules = {
  email: [
    {
      required: true,
      message: "Please input your email",
    },
    {
      type: "email",
      message:
        "Please enter email address in format “youremail@example.com”",
    },
    {
      max: 50,
      message: "Email length must not be more than 50 characters",
    }
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
    {
      max: 50,
      message: "Password length must not be more than 50 characters",
    }
  ]
};
export const LoginForm = (props) => {
  const {
    showForgetPassword,
    showLoading,
    loading,
    showMessage,
    message,
    authenticated,
    hideAuthMessage,
    showAuthMessage,
    hideLoading,
  } = props;

  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onLogin = () => {
    hideAuthMessage();
    form.validateFields().then((values) => {
      showLoading();
      JwtAuthService.login(values)
        .then((resp) => {
          if (values.rememberMe) {
            localStorage.setItem(AUTH_TOKEN, resp?.payload?.token);
            localStorage.setItem(
              REFRESH_TOKEN,
              resp?.payload?.token
            );
          } else {
            sessionStorage.setItem(AUTH_TOKEN, resp?.payload?.token);
          }
          authenticated(resp);
          let initialPathFromOutsideLink =
            localStorage.getItem(REDIRECT_PATH);
          if (initialPathFromOutsideLink) {
            navigate(initialPathFromOutsideLink);
          } else {
            navigate(`${DASHBOARD_PREFIX_PATH}`);
          }
        })
        .catch((e) => {
          console.log(e?.response?.data?.payload);
          showAuthMessage(
            e?.response?.data?.payload?.message
              ? [e?.response?.data?.payload?.message]
              : [
                  "No response from server, check your network connectivity and try again",
                ]
          );
        }).finally(() => {
          hideLoading();
        });
    });
  };

  const [visible, setVisible] = useState(false);

  const setFormChange = (values) => {
    if (values.rememberMe) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
  });

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 5000);
    }
  });

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="login-form"
        onFinish={onLogin}
        onValuesChange={setFormChange}
      >
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          validateFirst={true}
          rules={rules.email}
        >
          <Input
            autoComplete="off"
            placeholder="Enter your email address..."
            maxLength={50}
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Password</span>
            </div>
          }
          rules={rules.password}
        >
          <Input.Password
            placeholder="Enter your password"
            autoComplete="off"
            maxLength={50}
          />
        </Form.Item>

        <div className="d-flex justify-content-start">
          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            className="m-0 mt-3"
          >
            <Checkbox className="mb-4">Keep me logged in</Checkbox>
          </Form.Item>

          <div className="mt-4">
            <Popover
              content={`Make sure this is a trusted device`}
              placement="right"
              trigger="hover"
              visible={visible}
              className="ml-2 showPopOverPassword"
            ></Popover>
          </div>
        </div>

        {showMessage === true ? (
          <Alert
            type="error"
            className="mt-2 mb-3"
            showIcon
            message={handleErrors(message)}
          ></Alert>
        ) : (
          <></>
        )}

        <Form.Item className="mt-2">
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: true,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect, authUser } = auth;
  return { loading, message, showMessage, token, redirect, authUser };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  authenticated,
  hideLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
