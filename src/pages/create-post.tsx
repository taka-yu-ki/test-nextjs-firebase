import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../../types/post";
import classNames from "classnames";
import Button from "../../components/button";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/client";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";

// 投稿をfirestoreとalgoliaに保存する機能
const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  // 認証ガード機能
  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }

  // doc, setDocを使ってデータベースに情報を保存する機能
  const submit = (data: Post) => {
    const ref = doc(collection(db, "posts"));
    const post: Post = {
      id: ref.id,
      title: data.title,
      body: data.body,
      createdAt: Date.now(),
      updatedAt: null,
      authorId: fbUser.uid,
    };
    setDoc(ref, post).then(() => {
      alert("記事を作成しました");
    });
  };

  return (
    <div>
      <h1>記事投稿</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label className="block mb-0.5" htmlFor="name">
            タイトル*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.title ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="name"
            {...register("title", {
              required: "必須入力です",
              maxLength: {
                value: 100,
                message: "最大100文字です",
              },
            })}
            id="title"
            type="text"
          />
          {errors.title && (
            <p className="text-red-500 mt-0.5">{errors.title?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="name">
            本文*
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.body ? "border-red-500" : "border-slate-300"
            )}
            {...register("body", {
              required: "必須入力です",
              maxLength: {
                value: 400,
                message: "最大400文字です",
              },
            })}
            id="body"
          />
          {errors.body && (
            <p className="text-red-500 mt-0.5">{errors.body?.message}</p>
          )}
        </div>

        <Button>投稿</Button>
      </form>
    </div>
  );
};

export default CreatePost;
