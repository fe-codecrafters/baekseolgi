import { notFound } from "next/navigation";
import { allDevLogs } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/dev-log/mdx-components";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allDevLogs.find((post) => {
    return post.slugAsParams === decodeURIComponent(slug);
  });

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allDevLogs.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center">
      <article className="prose py-6">
        <h1 className="mb-2">{post.title}</h1>
        {post.description && (
          <p className="mt-0 text-xl text-slate-700">{post.description}</p>
        )}
        <hr className="my-4" />
        <Mdx code={post.body.code} />
      </article>
    </div>
  );
}
