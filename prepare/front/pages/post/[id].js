import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import Head from "next/head";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  console.log(singlePost);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          name="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta name="og:description" content={singlePost.content} />
        <meta
          name="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0]
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta name="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id, //=> useRouter에 접근하는거랑 똑같다
    });
    //saga에서 END불러오기
    store.dispatch(END);
    //saga에서 success될때까지 기다려주는 액션
    await store.sagaTask.toPromise();
  }
);

export default Post;
