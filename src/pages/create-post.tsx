import React from "react";
import PostForm from "../../components/post-form";

const CreatePost = () => {
  return (
    <div className="container">
      <PostForm isEditMode={false} />
    </div>
  );
};

export default CreatePost;
