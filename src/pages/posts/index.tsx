import { GetStaticProps } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { asText } from "@prismicio/helpers";
import Link from "next/link";

import { getPrismicClient } from "../../services/prismic";

import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostPropsInterface {
  posts: Post[];
}

export default function Posts({ posts }: PostPropsInterface) {
  return (
    <>
      <Head>
        <title>Posts | tech.feed</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  const prismicClient = getPrismicClient();

  const documents = await prismicClient.get({
    predicates: prismic.predicate.at("document.type", "post"),
    fetch: ["post.title", "post.content"],
    pageSize: 100,
  });

  const posts = documents.results.map((post) => {
    return {
      slug: post.uid,
      title: asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
