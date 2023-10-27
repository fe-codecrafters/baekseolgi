import { Header } from "@/components/Header";
import { allDevLogs } from "contentlayer/generated";
import Link from "next/link";

export default function DevLogPage() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center">
      <Header />
      <div className="prose">
        <h1 className="mb-2 font-semibold">100설기 기술 블로그</h1>
        {allDevLogs.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
