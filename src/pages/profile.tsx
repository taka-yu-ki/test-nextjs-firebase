import { ReactElement } from "react";
import Layout from "../../components/layout";
import { NextPageWithLayout } from "./_app";
import UserForm from "../../components/user-form";

const Profile: NextPageWithLayout = () => {
  return <UserForm isEditMode />;
};

// componentsのlayoutを各ページで使用する機能
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
