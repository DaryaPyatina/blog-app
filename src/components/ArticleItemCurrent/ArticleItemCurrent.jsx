import { Tag, Avatar, Button, Popconfirm } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import "./ArticleItemCurrent.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { articlesActions } from "../../store/articles/slice";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";

export const ArticleItemCurrent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userProfile } = useSelector((state) => {
    return state.authState;
  });

  const deleteArticle = () => {
    dispatch(articlesActions.removeArticle(id))
      .unwrap()
      .then(() => {
        navigate("/article");
      });
  };

  useEffect(() => {
    dispatch(articlesActions.fetchArticle(id));

    return () => {
      dispatch(articlesActions.setCurrentArticle(null));
    };
  }, []);

  const { currentArticle } = useSelector((state) => state.articlesState);

  return (
    <div className="wrapper-articleItemCurrent">
      <div className="main-articleCurrent">
        <div className="article-infoCurrent">
          <div className="article-info-header">
            <div className="title">{currentArticle?.title}</div>
            <div className="like">
              <HeartOutlined />
              <div className="numberLikes">
                {currentArticle?.favoritesCount}
              </div>
            </div>
          </div>
          <div className="tag">
            {currentArticle?.tagList.map((elem, index) => (
              <Tag key={index + 1}>{elem}</Tag>
            ))}
          </div>

          <div className="text">{currentArticle?.description}</div>
        </div>
        <div className="article-userCurrent-wrapper">
          <div className="article-userCurrent">
            <div className="article-user-info">
              <div className="article-user-name">
                {currentArticle?.author.username}
              </div>
              <div className="date">
                {currentArticle &&
                  format(new Date(currentArticle.createdAt), "PPP")}
              </div>
            </div>
            <div className="article-user-avatar">
              <Avatar
                size={46}
                icon={<UserOutlined />}
                src={currentArticle?.author.image}
              />
            </div>
          </div>
          {currentArticle?.author.username === userProfile?.username && (
            <div className="buttonsCurrent">
              <Link to={`/article/${id}/edit`}>
                <Button className="edit">Edit</Button>
              </Link>
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={deleteArticle}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
      <div className="main-text">
        <ReactMarkdown>{currentArticle?.body}</ReactMarkdown>
      </div>
    </div>
  );
};
