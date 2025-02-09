import Image from "next/image";
import { Metadata } from "next";
import { getStrapiDataWithToken } from "@/hooks/fetchData";

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

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getStrapiDataWithToken(
    `/posts?filters[slug][$eq]=${slug}&populate[cover][populate]=*`
  );
  const post = postData.data[0];

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_UPLOAD_URL}${post.cover.url}`],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  console.log(slug);
  // const postData = await getStrapiDataWithToken(
  //   `/posts?filters[id][$eq]=${slug}&populate=*`
  // );
  // const post: Post = postData.data[0];
  // console.log(`Single post`, post);

  const postData2 = await getStrapiDataWithToken(
    // `/posts/?${slug}&populate[cover][populate]=*&populate[blocks][populate]=*`
    `/posts?filters[slug][$eq]=${slug}&populate[cover][populate]=*&populate[blocks][populate]=*`
  );
  const post2: Post = postData2.data[0];
  console.log(`Single post #2`, post2);

  if (!post2) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto py-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post2.title}</h1>

        <div className="relative w-full h-[400px] mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${post2.cover.url}`}
            alt={post2.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose max-w-none">
          {/* <p className="text-lg">{post.attributes.description}</p> */}
        </div>
        {post2.blocks.map((block: any) => {
          return (
            <>
              {block.__component === "blocks.hero-section" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.heading}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${block.image.url}`}
                    alt={post2.title}
                    fill={false}
                    width={block.image.width}
                    height={block.image.height}
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              {block.__component === "blocks.info-block" && (
                <div className="relative w-full mb-6">
                  {block.headline}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${block.image.url}`}
                    alt={post2.title}
                    fill={false}
                    width={block.image.width}
                    height={block.image.height}
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
            </>
          );
        })}
      </article>
    </main>
  );
}
