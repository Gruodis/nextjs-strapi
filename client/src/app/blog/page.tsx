import Image from "next/image";
import Link from "next/link";

import { getStrapiDataWithToken } from "@/hooks/fetchData";

// async function getStrapiData(url: string) {
//   const baseUrl = "http://localhost:1337";
//   try {
//     const response = await fetch(baseUrl + url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

interface Image {
  id: number;
  url: string;
  width: number;
  height: number;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover: Image;
}

export default async function Home() {
  const postsData = await getStrapiDataWithToken("/posts?populate=*");
  console.log(postsData); //returns Object: { data: Array(2), meta: {…} }

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-4xl font-bold">Blog home page</h1>
      <div className="grid grid-cols-3 gap-4">
        {postsData.data.map((post: Post) => (
          <div key={post.id} className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>

            <Image
              src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${post.cover.url}`}
              alt={post.title}
              className="mt-4"
              width={post.cover.width}
              height={post.cover.height}
            />
            <p>{post.description}</p>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
