export const site = {
  name: "Aqib Plates",
  legalName: "AqibPlates",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aqibplates.com").replace(/\/$/, ""),
  description:
    "Private number plates for sale in the UK. Hand-picked cherished registrations with the DVLA V750 paperwork handled for you, plus a £9.99 plate finding service.",
  phone: "+44 7342 253120",
  phoneHref: "tel:+447342253120",
  email: "aqibplates@gmail.com",
  address: {
    street: "128 City Road",
    locality: "London",
    postalCode: "EC1V 2NX",
    country: "GB",
    countryName: "United Kingdom",
  },
  requestFee: 9.99,
  certificateLeadTime: "within about 2 weeks",
} as const;

export const nav = [
  { href: "/plates", label: "Private plates" },
  { href: "/plate-request", label: "Plate request" },
  { href: "/sold", label: "Sold" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
