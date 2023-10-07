import { createSlice } from "@reduxjs/toolkit";
import {
  fetchArticles,
  fetchArticle,
  createArticles,
  putFavoriteArticle,
  removeArticle,
  updateArticle,
  removeFavoriteArticle,
} from "./thunks";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    currentArticle: null,

    page: 1,
    articlesCount: 0,
    status: "init", // "loading", "success", "error",
  },
  reducers: {
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "success";
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = "success";
        state.currentArticle = action.payload.article;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(createArticles.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createArticles.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(putFavoriteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((elem) => {
          if (elem.slug === action.payload.article.slug) {
            return action.payload.article;
          }
          return elem;
        });
        state.status = "success";
      })
      .addCase(putFavoriteArticle.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(removeFavoriteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((elem) => {
          if (elem.slug === action.payload.article.slug) {
            return action.payload.article;
          }
          return elem;
        });
        state.status = "success";
      })
      .addCase(removeFavoriteArticle.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(removeArticle.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeArticle.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const articlesState = articlesSlice.reducer;
export const articlesActions = {
  ...articlesSlice.actions,
  fetchArticles,
  fetchArticle,
  createArticles,
  putFavoriteArticle,
  removeArticle,
  updateArticle,
  removeFavoriteArticle,
};
