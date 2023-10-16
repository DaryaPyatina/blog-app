import { Button, Form, Input, Checkbox, notification } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { authActions } from '../../store/auth/slice'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { validChecker } from '../../utils'
import * as yup from 'yup'

import './SignUpForm.scss'

const schema = yup.object({
  username: yup.string().required().min(2).max(20),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  repeatPassword: yup
    .string()

    .test('password', 'Passwords do not match', (value, context) => {
      return value === context.parent.password
    })
    .required('Repeat password is a required field'),

  agreement: yup.boolean(),
})

export const SignUpForm = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'User created',
    })
  }

  const notificationForError = (type) => {
    api[type]({
      message: 'User with this email already exists',
    })
  }

  const {
    handleSubmit,
    control,
    setError,
    reset,

    formState: { errors, isValid, isSubmitted },
  } = useForm({
    mode: 'all',
    defaultValues: { email: '', password: '', username: '' },
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(
      authActions.createUser({
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      })
    )
      .unwrap()
      .then(() => {
        openNotificationWithIcon('success')
        reset()
      })

      .catch(() => {
        setError('username')
        setError('email')
        setError('password')
        notificationForError('error')
        reset()
      })
  }
  return (
    <>
      {contextHolder}
      <div className="signUpForm">
        <div className="title-signUpForm">Create new account</div>
        <Form name="sign_up" className="login-form" layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Form.Item
            label="Username"
            validateStatus={validChecker(errors.username)}
            hasFeedback
            help={errors.username?.message}
          >
            <Controller
              control={control}
              name="username"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Email address"
            validateStatus={validChecker(errors.email)}
            hasFeedback
            help={errors.email?.message}
          >
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email address"
                  onBlur={onBlur}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={validChecker(errors.password)}
            hasFeedback
            help={errors.password?.message}
          >
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input.Password
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="Password"
                  onBlur={onBlur}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Repeat Password"
            validateStatus={validChecker(errors.repeatPassword)}
            hasFeedback
            help={errors.repeatPassword?.message}
          >
            <Controller
              control={control}
              name="repeatPassword"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input.Password
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="Password"
                  onBlur={onBlur}
                />
              )}
            />
          </Form.Item>
          <Form.Item valuePropName="checked">
            <Controller
              control={control}
              name="agreement"
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={onChange}>
                  I agree to the processing of my personal information
                </Checkbox>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid || isSubmitted}>
              Create
            </Button>
          </Form.Item>
          <div className="signUp-regInfo">
            {'Already have an account?'}
            <Link to="/sign-in">
              <div>Sign in</div>
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}
