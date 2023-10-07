import "./CreateNewArticle.scss";
import { Form, Input, Button, Result } from "antd";
import { articlesActions } from "../../store/articles/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const CreateNewArticle = () => {
  const { id } = useParams();

  const { currentArticle } = useSelector((state) => {
    return state.articlesState;
  });

  const { isAuth } = useSelector((state) => {
    return state.authState;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(articlesActions.fetchArticle(id));
    }

    return () => {
      dispatch(articlesActions.setCurrentArticle(null));
    };
  }, []);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const body = {
      article: {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList,
      },
    };
    if (currentArticle && id) {
      dispatch(articlesActions.updateArticle({ id, body }))
        .unwrap()
        .then(() => {
          navigate("/article");
        });
    } else {
      dispatch(articlesActions.createArticles(body))
        .unwrap()
        .then(() => {
          navigate("/article");
        });
    }
  };

  return isAuth ? (
    <div className="wrapper-createArticle">
      <div className="nameForm">
        {currentArticle ? "Edit article" : "Create new article"}
      </div>
      <Form
        name="create-article"
        className="createArticle-form"
        layout="vertical"
        initialValues={{
          title: currentArticle ? currentArticle.title : "",
          description: currentArticle ? currentArticle.description : "",
          body: currentArticle ? currentArticle.body : "",
          tagList: currentArticle ? currentArticle.tagList : [],
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Text"
          name="body"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className="textCreateArticle" placeholder="Text" />
        </Form.Item>

        <Form.List name="tagList">
          {(fields, { add, remove }) => (
            <div className="tags-createArticle">
              {fields.map((field) => {
                return (
                  <div className="tags-list" key={field.key}>
                    <Form.Item
                      name={[field.name]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                        {
                          pattern: new RegExp(/^[A-zA-Z0-9]*$/),
                          message: "No Space or Special Characters Allowed",
                        },
                      ]}
                    >
                      <Input className="tagInput" placeholder="Tags" />
                    </Form.Item>
                    <Button
                      danger
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  block
                  onClick={() => {
                    add();
                  }}
                >
                  Add tag
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className="sendArticle"
                  type="primary"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
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
