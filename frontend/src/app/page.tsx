import Image from "next/image";

async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

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
  image: Image;
}

export default async function Home() {
  const postsData = await getStrapiData("/api/posts?populate=*");
  const pageData = await getStrapiData("/api/home-page");

  const { id, Title, description } = pageData.data;
  console.log(postsData.data, pageData.data);

  return (
    <main className="container mx-auto py-6">
      {/* <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p> */}
      <div className="grid grid-cols-3 gap-4">
        {postsData.data.map((post: Post) => (
          <div key={post.id} className="bg-gray-100 p-4">
            <Image
              src={process.env.REACT_APP_UPLOAD_URL + post.image.url}
              alt={post.title}
              className="mt-4"
              width={post.image.width}
              height={post.image.height}
            />
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {id}
        <h2 className="text-xl font-bold">{Title}</h2>
        <p>{description}</p>
      </div>
    </main>
  );
}
