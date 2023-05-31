import React, { ReactNode } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsProps,
  SearchBoxProps,
  useInstantSearch,
  Pagination,
  Configure,
} from "react-instantsearch-hooks-web";
import { Post } from "../../types/post";
import { debounce } from "debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import useSWR from "swr/immutable";
import { User } from "../../types/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

// algoliaの検索クエリ機能を結びつける
const searchClient = algoliasearch(
  "XFS9BODPDH",
  "e068a01b53824eb9301335e26b78da1d"
);

// 検索ワードに対して記事のタイトル・日付・著者が返される機能
const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
  // useSWRを利用してuser/${hit.authorId}というロッカーにuser情報を入れる処理
  const { data: user } = useSWR<User>(
    hit.authorId && `users/${hit.authorId}`,
    async () => {
      console.log("データ取得");
      const ref = doc(db, `users/${hit.authorId}`);
      const snap = await getDoc(ref);
      return snap.data() as User;
    }
  );

  return (
    <div className="rounded-md shadow p-4">
      <h2 className="line-clamp-2">{hit.title}</h2>
      {/* firestoreから日付のデータを取得できないため、一時的に定数を入れている */}
      <p className="text-slate-500">
        {format(1685269825108, "yyyy年MM月dd日")}
      </p>
      {/* <p>{hit.createdAt}</p> */}
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
