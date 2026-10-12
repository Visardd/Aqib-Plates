import { defineField, defineType } from "sanity";

export const plateType = defineType({
  name: "plate",
  title: "Plate",
  type: "document",
  fields: [
    defineField({
      name: "registration",
      title: "Registration",
      description: "Exactly as it should be shown, including spacing (e.g. KY5 8REV).",
      type: "string",
      validation: (rule) => rule.required().max(12),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "Generated from the registration. Don't change it once the plate is live.",
      type: "slug",
      options: {
        source: "registration",
        slugify: (input: string) => input.toLowerCase().trim().replace(/\s+/g, "-"),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
      validation: (rule) => rule.min(0).precision(2),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "available",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved (payment in progress)", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "soldAt",
      title: "Date sold",
      type: "date",
      hidden: ({ document }) => document?.status !== "sold",
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "Note for buyers",
      description: 'Shown on the plate page, e.g. "Valid on vehicles registered after 1 September 2005."',
      type: "string",
    }),
  ],
  orderings: [
    { title: "Price, high to low", name: "priceDesc", by: [{ field: "price", direction: "desc" }] },
    { title: "Newest first", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "registration", price: "price", status: "status" },
    prepare: ({ title, price, status }) => ({
      title,
      subtitle: [price ? `£${price}` : null, status].filter(Boolean).join(" · "),
    }),
  },
});

export const schemaTypes = [plateType];
