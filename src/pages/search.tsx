import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import algoliasearch from "algoliasearch/lite";
import { format } from "date-fns";
import { debounce } from "debounce";
import Link from "next/link";
import { ReactNode } from "react";
import {
  Hits,
  HitsProps,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { useUser } from "../../lib/user";
import { Post } from "../../types/post";

// algoliaの検索クエリ機能を結びつける
const searchClient = algoliasearch(
  "XFS9BODPDH",
  "e068a01b53824eb9301335e26b78da1d"
);

// 検索ワードに対して記事のタイトル・日付・著者が返される機能
const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
  const user = useUser(hit.authorId);

  return (
    <div className="rounded-md shadow p-4">
      <h2 className="line-clamp-2">
        <Link legacyBehavior href={`posts/${hit.id}`}>
          <a>{hit.title}</a>
        </Link>
      </h2>
      <p className="text-slate-500">
        {format(hit.createdAt, "yyyy年MM月dd日")}
      </p>
      {user && <p className="truncate">{user.name}</p>}
    </div>
  );
};

// 検索結果の表示を編集する処理
const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
  const { results } = useInstantSearch();

  // 検索中でなく、ヒットが0件であった時の処理
  if (!results.__isArtificial && results.nbHits == 0) {
    return <p>「{results.query}」の検索結果はありませんでした</p>;
  }

  // 検索結果があった時の表示
  return (
    <div className="container">
      {results.query && (
        <p className="text-sm text-slate-500 my-4">
          「{results.query}」の検索結果が{results.nbHits}件見つかりました
        </p>
      )}
      {children}
    </div>
  );
};

// 検索機能
const Search = () => {
  // 検索をする機能
  const search: SearchBoxProps["queryHook"] = (query, hook) => {
    console.log("検索実行");
    hook(query);
  };
  return (
    <div>
      <h1>検索</h1>
      {/* Instantsearchで囲った中でSearchBoxを作れる */}
      <InstantSearch indexName="posts" searchClient={searchClient}>
        {/* 検索する機能 */}
        <SearchBox
          classNames={{
            root: "relative inline-block",
            input: "rounded-full border-slate-300 pr-10",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
          submitIconComponent={() => (
            <span className="absolute right-0 p-2 w-10 top-1/2 -translate-y-1/2">
              {/* Iconを表示する処理 */}
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-500" />
            </span>
          )}
          // 検索を開始するタイミングを変更する処理
          queryHook={debounce(search, 500)}
        />
        {/* １ページに入る検索結果を編集する処理 */}
        {/* <Configure hitsPerPage={2} /> */}
        <NoResultsBoundary>
          <Hits<Post>
            classNames={{
              list: "space-y-4 my-6",
            }}
            hitComponent={Hit}
          />
          {/* 検索結果のページを表示・移動する処理 */}
          <Pagination
            classNames={{
              list: "flex space-x-1",
              link: "py-1 px-3 block",
              disabledItem: "opacity-40",
              selectedItem: "text-blue-500",
            }}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
};

export default Search;
