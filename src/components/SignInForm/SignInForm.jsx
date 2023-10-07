import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth/slice";
import "./SignInForm.scss";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(
      authActions.userLogin({
        user: {
          email: values.email,
          password: values.password,
        },
      })
    )
      .unwrap()
      .then(() => navigate("/article"));
  };
  return (
    <div className="signInForm">
      <div className="title-signInForm">Sign In</div>
      <Form
        name="sign_in"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              message: "Please input your e-mail address!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" type="password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <div className="signIn-regInfo">
          {"Don’t have an account?"}
          <a href="///">Sign up.</a>
        </div>
      </Form>
    </div>
  );
};
