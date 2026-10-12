import type { BreadcrumbList, Offer, Organization, Product, Store, WebSite, WithContext } from "schema-dts";
import { absoluteUrl, site } from "./site";
import type { Plate } from "./plates";

const orgId = absoluteUrl("/#organization");

export const plateImageUrl = (slug: string) => absoluteUrl(`/og/plates/${slug}`);

export function organizationSchema(): WithContext<Store> {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    telephone: site.phone,
    email: site.email,
    priceRange: "££",
    currenciesAccepted: "GBP",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: site.address.countryName },
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    inLanguage: "en-GB",
    publisher: { "@id": orgId } as Organization,
  };
}

export function plateProductSchema(plate: Plate): WithContext<Product> {
  const url = absoluteUrl(`/plates/${plate.slug}`);
  const offer: Offer | undefined =
    plate.price === undefined
      ? undefined
      : {
          "@type": "Offer",
          url,
          price: plate.price.toFixed(2),
          priceCurrency: "GBP",
          availability:
            plate.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": orgId } as Organization,
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plate.registration} private number plate`,
    sku: plate.slug.toUpperCase(),
    category: "Private number plates",
    description: `${plate.registration} cherished registration for sale. Supplied on a DVLA V750 Certificate of Entitlement in the buyer's name.`,
    image: plateImageUrl(plate.slug),
    url,
    brand: { "@type": "Brand", name: site.name },
    ...(offer ? { offers: offer } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
