import { ArticleItem } from "../ArticleItem/ArticleItem";
import { Pagination } from "antd";
import "./ArticleList.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articlesActions } from "../../store/articles/slice";

export const ArticleList = () => {
  const { articles, articlesCount, page } = useSelector((state) => {
    return state.articlesState;
  });

  const onPagination = (value) => {
    dispatch(articlesActions.fetchArticles(value * 10));
    dispatch(articlesActions.setPage(value));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articlesActions.fetchArticles());
    return () => {
      dispatch(articlesActions.setPage(1));
    };
  }, []);
  return (
    <div className="articleList">
      {articles.map((elem) => (
        <ArticleItem key={elem.slug} articleData={elem} />
      ))}

      <Pagination
        defaultPageSize={10}
        showSizeChanger={false}
        total={articlesCount}
        onChange={onPagination}
        current={page}
        style={{ marginBottom: 30 }}
      />
    </div>
  );
};
