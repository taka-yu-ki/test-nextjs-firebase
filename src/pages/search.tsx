import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import algoliasearch from "algoliasearch/lite";
import { debounce } from "debounce";
import { ReactElement, ReactNode } from "react";
import {
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import Layout from "../../components/layout";
import { Post } from "../../types/post";
import { NextPageWithLayout } from "./_app";
import PostItemCard from "../../components/post-item-card";

// algoliaの検索クエリ機能を結びつける
const searchClient = algoliasearch(
  "XFS9BODPDH",
  "e068a01b53824eb9301335e26b78da1d"
);

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
const Search: NextPageWithLayout = () => {
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
        {/* <Configure postsPerPage={2} /> */}
        <NoResultsBoundary>
          <Hits<Post>
            classNames={{
              list: "space-y-4 my-6",
            }}
            hitComponent={({ hit }) => <PostItemCard post={hit} />}
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

// componentsのlayoutを各ページで使用する機能
Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Search;
