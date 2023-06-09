import React, { ReactElement } from "react";
import PostForm from "../../../../components/post-form";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "../../../../components/layout";

const EditPage: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PostForm isEditMode />
    </div>
  );
};

// componentsのlayoutを各ページで使用する機能
EditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPage;
