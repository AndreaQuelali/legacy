import type { MetadataRoute } from "next"

const BASE_URL = "https://legacy-topaz.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "es"].map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: { en: `${BASE_URL}/en`, es: `${BASE_URL}/es` },
    },
  }))
}
