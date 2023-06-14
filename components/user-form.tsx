import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth";
import { db, storage } from "../firebase/client";
import { User } from "../types/user";
import Button from "./button";
import ImageSelector from "./image-selector";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useEffect } from "react";

// アカウントを作成するコンポーネント
const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
  const { fbUser, isLoading, user } = useAuth();
  // ページを指定のところへ飛ばす機能
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  useEffect(() => {
    if (isEditMode && user) {
      reset(user);
    }
  }, [isEditMode, user]);

  // ログイン情報が読み込み中であれば白紙にする
  if (isLoading) {
    return null;
  }

  // 認証ガード機能
  if (!fbUser) {
    router.push("/login");
    return null;
  }

  // 入力した情報をFirebase Firestoreに保存する機能
  const submit = async (data: User) => {
    if (data.avatarURL?.match(/^data:/)) {
      const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await uploadString(imageRef, data.avatarURL, "data_url");
      data.avatarURL = await getDownloadURL(imageRef);
    }

    if (!data.avatarURL && user?.avatarURL) {
      const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await deleteObject(imageRef);
    }
    // ドキュメントを作成するところを指定する
    const documentRef = doc(db, `users/${fbUser.uid}`);
    return setDoc(documentRef, data).then(() => {
      alert(`ユーザーを${isEditMode ? "更新" : "作成"}しました"`);
      if (!isEditMode) {
        router.push("/");
      }
    });
  };

  return (
    <div className="container">
      <h1>{isEditMode ? "プロフィール編集" : "アカウント作成"}</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <h2>プロフィール画像</h2>
          <ImageSelector name="avatarURL" control={control} />
        </div>
        <div>
          <label className="block mb-0.5" htmlFor="name">
            名前*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="name"
            {...register("name", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            id="name"
            name="name"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 mt-0.5">{errors.name?.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-0.5" htmlFor="nickname">
            ニックネーム*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="off"
            {...register("nickname", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            id="nickname"
            name="nickname"
            type="text"
          />
          {errors.nickname && (
            <p className="text-red-500 mt-0.5">{errors.nickname?.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-0.5" htmlFor="profile">
            プロフィール*
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            defaultValue=""
            {...register("profile", {
              required: "必須入力です",
              maxLength: {
                value: 255,
                message: "最大255文字です",
              },
            })}
            id="profile"
            name="profile"
          />
          <p className="text-sm text-slate-400 leading-none">
            {watch("profile")?.length}/225
          </p>
          {errors.profile && (
            <p className="text-red-500 mt-0.5">{errors.profile?.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting}>
          {isEditMode ? "更新" : "アカウント作成"}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
