import { ReactElement } from "react";
import Button from "../../components/button";
import { login, logout } from "../../lib/auth";
import { NextPageWithLayout } from "./_app";
import Layout from "../../components/layout";

const LoginPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>ログイン</h1>

      <Button type="button" onClick={login}>
        ログインする
      </Button>

      <Button type="button" onClick={logout}>
        ログアウトする
      </Button>
    </div>
  );
};

// componentsのlayoutを各ページで使用する機能
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
