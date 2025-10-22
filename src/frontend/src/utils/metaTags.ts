import { ProductOutOpen } from "../client"

export interface MetaTagsData {
  title: string
  description: string
  url: string
  image: string
  type: string
}

export const generateProductMetaTags = (product: ProductOutOpen): MetaTagsData => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://shebascaravan.com"
  const fallbackImage = `${baseUrl}/favicon.png`

  let title = product.name || "Sheba's Caravan | 𐩣𐩮𐩧 𐩪𐩨𐩱"
  if (product.name_musnad) {
    title = `${title} | ${product.name_musnad}`
  }
  title = `${title} - Sheba's Caravan | 𐩣𐩮𐩧 𐩪𐩨𐩱`

  const description = product.short_description || product.description || "Handcrafted jewellery rooted in Ancient South Arabian and Yemenite traditions."
  const cleanDescription = description.replace(/\s+/g, ' ').trim()
  const truncatedDescription = cleanDescription.length > 200 
    ? cleanDescription.substring(0, 197) + "..." 
    : cleanDescription

  let image = fallbackImage
  if (product.images && product.images.length > 0) {
    const firstImage = product.images[0]
    if (firstImage.startsWith("http")) {
      image = firstImage
    } else {
      image = `${baseUrl}/public/products/${product.sku}/${firstImage}`
    }
  }

  const url = `${baseUrl}/treasure/${product.url_key}`

  return {
    title,
    description: truncatedDescription,
    url,
    image,
    type: "product"
  }
}

export const generateProductStructuredData = (product: ProductOutOpen) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://shebascaravan.com"
  
  const images = product.images?.map(image => {
    if (image.startsWith("http")) {
      return image
    }
    return `${baseUrl}/public/products/${product.sku}/${image}`
  }) || []

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.sku,
    "image": images,
    "brand": {
      "@type": "Brand",
      "name": "Sheba's Caravan"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/treasure/${product.url_key}`,
      "priceCurrency": "GBP",
      "price": product.price.toFixed(2),
      "availability": product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Sheba's Caravan"
      }
    },
    "category": "Jewellery"
  }
}

export const getStoreSchema = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://shebascaravan.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "Sheba's Caravan",
    "description": "Handcrafted jewellery rooted in Ancient South Arabian and Yemenite traditions",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.svg`,
    "image": `${baseUrl}/favicon.png`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "priceRange": "$$",
    "sameAs": []
  }
}

export const getDefaultMetaTags = (): MetaTagsData => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://shebascaravan.com"
  
  return {
    title: "Sheba's Caravan | 𐩣𐩮𐩧 𐩪𐩨𐩱",
    description: "Handcrafted jewellery rooted in Ancient South Arabian and Yemenite traditions.",
    url: baseUrl,
    image: `${baseUrl}/favicon.png`,
    type: "website"
  }
}
