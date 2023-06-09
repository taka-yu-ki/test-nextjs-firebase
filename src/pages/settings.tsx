import { ReactElement } from "react";
import Layout from "../../components/layout";
import { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
  return (
    <div>
      <h1>設定画面</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        nihil provident sint eveniet, inventore enim, quasi earum repellendus
        officiis excepturi maiores ab est fuga. Dicta repudiandae aspernatur
        architecto a cum!
      </p>
    </div>
  );
};

// componentsのlayoutを各ページで使用する機能
Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
