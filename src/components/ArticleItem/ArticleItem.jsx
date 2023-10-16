import './ArticleItem.scss'
import { Link } from 'react-router-dom'

import { Tag, Avatar } from 'antd'
import { UserOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { tagFormater } from '../../utils'
import { articlesActions } from '../../store/articles/slice'
import { truncate } from '../../utils/index'
import format from 'date-fns/format'

export const ArticleItem = ({ articleData }) => {
  const dispatch = useDispatch()

  const onFollow = () => {
    dispatch(articlesActions.putFavoriteArticle(articleData.slug))
  }
  const onUnFollow = () => {
    dispatch(articlesActions.removeFavoriteArticle(articleData.slug))
  }

  return (
    <div className="main">
      <div className="article-info">
        <div className="article-info-header">
          <Link to={`/article/${articleData.slug}`} target="_blank">
            <div className="title">{truncate(articleData.title, 30)}</div>
          </Link>
          <div className="like">
            {articleData.favorited ? (
              <HeartFilled className="putLike" onClick={onUnFollow} />
            ) : (
              <HeartOutlined onClick={onFollow} />
            )}

            <div className="numberLikes">{articleData.favoritesCount}</div>
          </div>
        </div>
        <div className="tag">
          {tagFormater(articleData.tagList).map((elem, index) => (
            <Tag key={index + 1}>{truncate(elem, 20)}</Tag>
          ))}
        </div>

        <div className="text">{truncate(articleData.description, 200)}</div>
      </div>
      <div className="article-user">
        <div className="article-user-info">
          <div className="article-user-name">{articleData.author.username}</div>
          <div className="date">{format(new Date(articleData.createdAt), 'PPP')}</div>
        </div>
        <div className="article-user-avatar">
          <Avatar size={46} icon={<UserOutlined />} src={articleData.author.image} />
        </div>
      </div>
    </div>
  )
}
