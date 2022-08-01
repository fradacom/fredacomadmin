import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import {
    showLoading,
    hideLoading,
    saveCategory,
    hideAuthMessage,
    showAuthMessage
} from "redux/actions/Auth";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from 'configs/AppConfig';
import handleErrors from 'services/handleErrors';
import RequestService from "services/RequestService";

const rules = {
  name: [
        {
            required: true,
            message: "Please input your email",
        },
    ],
};
export const LoginForm = (props) => {
  const {
    showLoading,
    loading,
    showMessage,
    message,
    hideAuthMessage,
    showAuthMessage,
    hideLoading,
  } = props;

  let navigate = useNavigate();
  const [form] = Form.useForm();

  const saveForm = () => {
    hideAuthMessage();
    form.validateFields().then((values) => {
        showLoading();
        RequestService.createCategory(values)
            .then((resp) => {
                saveCategory(resp?.payload);
                navigate(`${DASHBOARD_PREFIX_PATH}/category`);
            })
            .catch((e) => {
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
        onFinish={saveForm}
      >
        <h3>Create Category</h3>
        <Form.Item
            name="name"
            label="Name"
            hasFeedback
            validateFirst={true}
            rules={rules.name}
        >
        <Input
            autoComplete="off"
            placeholder="Enter category name..."
          />
        </Form.Item>
        {showMessage === true ? (
            <Alert
                type="error"
                className="mt-2 mb-3"
                showIcon
                message={handleErrors(message)}
                >    
            </Alert>
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
                Create category 
            </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser, loading } = auth;
  return { authUser, loading };
};

const mapDispatchToProps = {
  saveCategory,
  showLoading,
  hideLoading,
  showAuthMessage,
  hideAuthMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
