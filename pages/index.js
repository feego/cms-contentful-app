import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome, getPage1 } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { renderComponentList } from "../components/editorial-engine/ContentfulComponent";
import Post from "../components/editorial-engine/Post";
import PostHeader from "../components/post-header";
import PostBody from "../components/post-body";

export default function Index({ preview, content }) {
  console.log("page content", content);
  return (
    <Layout preview={preview}>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <h1 style={{ paddingTop: "40px", fontSize: "40px", fontWeight: "600" }}>
          PAGE TITLE: {content.title}
        </h1>
        <PostHeader
          title={content.title}
          coverImage={content.coverImage}
          date={content.date}
          author={content.author}
        />
        <PostBody content={content.content} />
        <h2 style={{ paddingTop: "30px", fontSize: "40px", fontWeight: "600" }}>
          List of dynamic CMS components
        </h2>
        {renderComponentList(content.componentsCollection)}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const content = (await getPage1(preview)) ?? [];
  return {
    props: { preview, content },
  };
}
