import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/slice";

import "./SignUpForm.scss";

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      authActions.createUser({
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      })
    );
  };
  return (
    <div className="signUpForm">
      <div className="title-signUpForm">Create new account</div>
      <Form
        name="sign_up"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              message: "Please input your username!",
              required: true,
            },
            {
              message: "Your username needs to be at least 3 characters.",
              min: 3,
              max: 20,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              message: "Please input your e-mail address!",
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              message: "Your password needs to be at least 6 characters.",
              min: 6,
              max: 40,
              required: true,
            },
          ]}
        >
          <Input.Password placeholder="Password" type="password" />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeatPassword"
          dependencies={["password"]}
          rules={[
            {
              message: "Please repeat the your password!",
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" type="password" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              message: "Required field.",

              required: true,
            },
          ]}
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Create
          </Button>
        </Form.Item>
        <div className="signUp-regInfo">
          {"Already have an account?"}
          <a href="///">Sign in</a>
        </div>
      </Form>
    </div>
  );
};
