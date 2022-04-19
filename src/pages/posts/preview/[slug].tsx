import { asHTML, asText } from "@prismicio/helpers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";

interface PostPreviewPropsInterface {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewPropsInterface) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    session?.userHasActiveSubscription && router.push(`/posts/${post.slug}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Continuar lendo?
            <Link href="/">
              <a href="">Assine agora 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismicClient = getPrismicClient();

  const document = await prismicClient.getByUID("post", slug.toString(), {});

  const post = {
    slug,
    title: asText(document.data.title),
    content: asHTML(document.data.content.splice(0, 3)),
    updatedAt: new Date(document.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
