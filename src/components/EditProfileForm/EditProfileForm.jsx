import { Button, Form, Input, Result } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth/slice";
import { useNavigate, Link } from "react-router-dom";

import "./EditProfileForm.scss";

export const EditProfileForm = () => {
  const navigate = useNavigate();
  const { userProfile, isAuth } = useSelector((state) => {
    return state.authState;
  });
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      authActions.updateUser({
        user: {
          email: values.email,
          password: values.password,
          username: values.username,
          bio: values.bio,
          image: values.image,
        },
      })
    )
      .unwrap()
      .then(() => navigate("/article"));
  };

  return isAuth ? (
    <div className="editProfileForm">
      <div className="title-editProfileForm">Edit Profile</div>
      <Form
        name="edit_profile"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
          username: userProfile?.username,
          email: userProfile?.email,
          image: userProfile?.image,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              message: "Please input your username!",
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
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          label=" New password"
          name="password"
          rules={[
            {
              message: "Your password needs to be at least 6 characters.",
              min: 6,

              max: 40,
            },
          ]}
        >
          <Input.Password placeholder="New password" type="password" />
        </Form.Item>

        <Form.Item
          label="Avatar image (url)"
          name="image"
          rules={[
            {
              message: "Please input url!",
            },

            {
              type: "url",
              warningOnly: true,
            },
          ]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      }
    />
  );
};
