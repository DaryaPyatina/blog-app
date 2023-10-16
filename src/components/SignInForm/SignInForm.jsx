import { Button, Form, Input, notification } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth/slice'
import './SignInForm.scss'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validChecker } from '../../utils'
import * as yup from 'yup'

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export const SignInForm = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Invalid email or password',
    })
  }

  const {
    handleSubmit,
    control,
    setError,
    reset,

    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      .then(() => navigate('/article'))
      .catch(() => {
        setError('email')
        setError('password')
        openNotificationWithIcon('error')
        reset()
      })
  }
  return (
    <>
      {contextHolder}
      <div className="signInForm">
        <div className="title-signInForm">Sign In</div>
        <Form name="sign_in" className="login-form" layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Form.Item
            label="Email address"
            validateStatus={validChecker(errors.email)}
            hasFeedback
            help={errors.email?.message}
          >
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email address"
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
              render={({ field: { value, onChange } }) => (
                <Input.Password type="password" value={value} onChange={onChange} placeholder="Password" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid || isSubmitted}>
              Log in
            </Button>
          </Form.Item>
          <div className="signIn-regInfo">
            {'Don’t have an account?'}
            <Link to="/sign-up">
              <div>Sign up.</div>
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}
