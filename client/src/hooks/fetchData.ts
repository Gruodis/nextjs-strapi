export async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getStrapiDataWithToken(endPoint: string) {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(baseUrl + endPoint, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTGRES_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log(data, baseUrl + endPoint);
    return data;
  } catch (error) {
    console.error(error);
  }
}
