import { asHTML, asText } from "@prismicio/helpers";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { getPrismicClient } from "../../services/prismic";

import styles from "./post.module.scss";

interface PostPropsInterface {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostPropsInterface) {
  return (
    <>
      <Head>
        <title>{post.title} | tech.feed</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.userHasActiveSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismicClient = getPrismicClient();

  const post = await prismicClient.getByUID("post", slug.toString(), {});

  return {
    props: {
      post: {
        slug,
        title: asText(post.data.title),
        content: asHTML(post.data.content),
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      },
    },
  };
};
