import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getArticles,
  getArticle,
  postArticle,
  postFavorite,
  deleteArticle,
  putArticle,
  deleteFavorite,
} from "../../services";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (offset) => {
    const data = await getArticles(offset);
    return data;
  }
);

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (id) => {
    const data = await getArticle(id);
    return data;
  }
);

export const createArticles = createAsyncThunk(
  "articles/createArticles",
  async (body) => {
    const data = await postArticle(body);
    return data;
  }
);

export const putFavoriteArticle = createAsyncThunk(
  "article/putFavoriteArticle",
  async (id) => {
    const data = await postFavorite(id);
    return data;
  }
);

export const removeArticle = createAsyncThunk(
  "article/removeArticle",
  async (id) => {
    const data = await deleteArticle(id);
    return data;
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ id, body }) => {
    const data = await putArticle(id, body);
    return data;
  }
);

export const removeFavoriteArticle = createAsyncThunk(
  "article/removeFavoriteArticle",
  async (id) => {
    const data = await deleteFavorite(id);
    return data;
  }
);
