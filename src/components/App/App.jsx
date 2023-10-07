import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, Link } from "react-router-dom";
import { Button } from "antd";
import { ArticleList } from "../ArticleList/ArticleList";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { SignInForm } from "../SignInForm/SignInForm";
import { EditProfileForm } from "../EditProfileForm/EditProfileForm";
import { CreateNewArticle } from "../CreateNewArticle/CreateNewArticle";
import { ArticleItemCurrent } from "../ArticleItemCurrent/ArticleItemCurrent";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth/slice";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Page404 } from "../Page404/Page404";

export const App = () => {
  const dispatch = useDispatch();

  const { isAuth, userProfile } = useSelector((state) => {
    return state.authState;
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(authActions.setAuth());
    }
  }, []);
  return (
    <div className="main-app">
      <header className="header-app">
        <Link to="/article">
          <div className="name">Realworld Blog</div>
        </Link>
        {isAuth ? (
          <div className="auth">
            <Link to="/new-article">
              <Button className="create">Create article</Button>
            </Link>

            <div className="userName">{userProfile.username}</div>
            <div className="userAvatar">
              <Link to="/profile">
                <Avatar
                  size={46}
                  icon={<UserOutlined />}
                  src={userProfile.image}
                />
              </Link>
            </div>
            <Button
              onClick={() => {
                dispatch(authActions.logout());
              }}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="header-buttons">
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>

            <Link to="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>
        )}
      </header>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleItemCurrent />} />
        <Route path="/article/:id/edit" element={<CreateNewArticle />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/new-article" element={<CreateNewArticle />} />
        <Route path="/profile" element={<EditProfileForm />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
