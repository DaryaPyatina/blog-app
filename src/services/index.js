import axios from "axios";

const api = axios.create({
  baseURL: "https://blog.kata.academy/api",
});

export const getArticles = async (offset = 0) => {
  const { data } = await api.get(`/articles?limit=10&offset=${offset}`, {
    headers: {
      Authorization: localStorage.getItem("user")
        ? `Token ${JSON.parse(localStorage.getItem("user")).token}`
        : "",
    },
  });
  return data;
};

export const postArticle = async (body) => {
  const { data } = await api.post("/articles", body, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  return data;
};

export const getArticle = async (id) => {
  const { data } = await api.get(`/articles/${id}`);
  return data;
};

export const putArticle = async (id, body) => {
  const { data } = await api.put(`/articles/${id}`, body, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  return data;
};

export const deleteArticle = async (id) => {
  const { data } = await api.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  return data;
};

export const postUser = async (body) => {
  const { data } = await api.post("/users", body);
  return data;
};

export const login = async (body) => {
  const { data } = await api.post("/users/login", body);
  return data;
};

export const putUser = async (body) => {
  const { data } = await api.put("/user", body, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  return data;
};

export const postFavorite = async (id) => {
  const { data } = await api.post(
    `/articles/${id}/favorite`,
    {},
    {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
  return data;
};

export const deleteFavorite = async (id) => {
  const { data } = await api.delete(
    `/articles/${id}/favorite`,

    {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
  return data;
};
