import Link from "next/link";
import { useUser } from "../lib/user";
import { Post } from "../types/post";
import { format } from "date-fns";

// 検索ワードに対して記事のタイトル・日付・著者が返される機能
const PostItemCard = ({ post }: { post: Post }) => {
  const user = useUser(post.authorId);

  return (
    <div className="rounded-md shadow p-4">
      <h2 className="line-clamp-2">
        <Link legacyBehavior href={`posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      {user && (
        <div className="flex items-center">
          <img
            src={user?.avatarURL}
            className="w-8 h-8 block rounded-full mr-2"
            alt=""
          />
          <div>
            <p className="truncate">{user.name}</p>
            <p className="text-slate-500 text-sm">
              {format(post.createdAt, "yyyy年MM月dd日")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItemCard;
