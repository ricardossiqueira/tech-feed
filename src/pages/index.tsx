import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | tech.feed</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Olá, bem vindo! 👏</span>
          <h1>
            Novidades do mundo <span>React</span>.
          </h1>
          <p>
            Garanta acesso à todas as publicações por apenas{" "}
            <span>{product.amount}</span> ao mês.
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src="/images/undraw_online_reading.svg"
          alt="Homem lendo"
          width={1027}
          height={732}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KnolvGIRNEmCqh7F6Y7ZHpl");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
