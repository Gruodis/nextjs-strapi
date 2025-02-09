"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { getStrapiDataWithToken } from "@/hooks/fetchData";

// async function getStrapiDataWithToken(url: string) {
//   // const baseUrl = "http://localhost:1337";
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTGRES_TOKEN}`,
//       },
//     });
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
  title: string;
  description: string;
  cover: Image;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getStrapiDataWithToken("/articles?populate=*").then((data) => {
      setPosts(data.data);
    });
  }, []);

  console.log(posts);

  // const postsData = await getStrapiData("/api/articles?populate=*");
  // const pageData = await getStrapiData("/api/home-page");

  // const { id, Title, description } = pageData.data;
  // console.log(postsData); //returns Object: { data: Array(2), meta: {…} }

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-4xl font-bold">Home page</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post: Post) => (
          <div key={post.id} className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            {/* <Image
              src={process.env.REACT_APP_UPLOAD_URL + post.image.url}
              alt={post.title}
              className="mt-4"
              width={post.image.width}
              height={post.image.height}
            /> */}
            <span>{process.env.NEXT_PUBLIC_UPLOAD_URL + post.cover.url}</span>
            <Image
              src={process.env.NEXT_PUBLIC_UPLOAD_URL + post.cover.url}
              alt={post.title}
              className="mt-4"
              width={post.cover.width}
              height={post.cover.height}
            />
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-3 gap-4">
        {id}
        <h2 className="text-xl font-bold">{Title}</h2>
        <p>{description}</p>
      </div> */}
    </main>
  );
}
