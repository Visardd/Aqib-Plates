import type { GuideSection } from "./guides";
import { site } from "@/lib/site";

// DRAFTS. Written from the policies on the current site. Aqib must check every line, and
// ideally have a solicitor review them, before launch. Body text supports [links](/path).

export type LegalDoc = {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: GuideSection[];
};

const contact = `[${site.email}](mailto:${site.email})`;
const address = `${site.address.street}, ${site.address.locality} ${site.address.postalCode}`;

export const terms: LegalDoc = {
  title: "Terms of Sale",
  description:
    "The terms that apply when you buy a private registration or use the plate finding service from Aqib Plates.",
  updated: "2026-10-12",
  intro:
    "These terms apply when you buy a private registration or use our plate finding service through this website. Please read them before you place an order.",
  sections: [
    {
      heading: "About us",
      body: [
        `${site.name} is based at ${address}. You can reach us on [${site.phone}](${site.phoneHref}) or at ${contact}.`,
      ],
    },
    {
      heading: "What you're buying",
      body: [
        "When you buy a registration from us, you're buying the right to display that registration on an eligible vehicle. We don't supply physical number plates.",
        "The registration is transferred to you on a DVLA [V750 Certificate of Entitlement](/guides/what-is-a-v750-certificate) in the name you give us at checkout. It's your responsibility to check the registration can go on your vehicle: a registration can't make a vehicle look newer than it is. If you're not sure, [ask us](/contact) before you buy.",
      ],
    },
    {
      heading: "Prices and payment",
      body: [
        "Prices are in pounds sterling and are the final price for the registration, with no extra or hidden fees. Payments are taken securely by Stripe. We never see or store your card details.",
      ],
    },
    {
      heading: "Your order",
      body: [
        "Your order is accepted when your payment is confirmed and we send you a confirmation email. Every registration is unique, so while one buyer is paying for a plate we hold it for them and it can't be bought by anyone else.",
        "If we can't supply a registration you've paid for, we'll tell you straight away and refund you in full.",
      ],
    },
    {
      heading: "Your V750 certificate",
      body: [
        "After your order, we notify the DVLA, who issue the V750 certificate using the details you gave at checkout. It usually arrives within about 2 weeks, depending on DVLA processing times and Royal Mail. Please check your details carefully, as mistakes can delay the certificate.",
      ],
    },
    {
      heading: "Cancellations and refunds",
      body: [
        "A registration is personalised to you. Once your order is placed we notify the DVLA and the right to the registration is transferred into your name. Because of this, we can't accept changes, cancellations or returns once an order is placed, and payments for registrations are non-refundable.",
        "This doesn't affect your statutory rights.",
      ],
    },
    {
      heading: "Plate finding service",
      body: [
        `Our plate finding service costs £${site.requestFee}. We search the DVLA and private markets for registrations that match your request and budget, and send you the options we find. You don't have to buy any plate we suggest, and any plate you do buy is sold under these terms.`,
        `If we can't find a plate that matches your request, we'll refund the £${site.requestFee} fee in full.`,
      ],
    },
    {
      heading: "Displaying your registration",
      body: [
        "You must display the registration in line with UK law, including the DVLA rules on fonts and spacing. Our guide to [number plate rules](/guides/number-plate-rules) explains them. We're not responsible for fines, failed MOTs or a registration being withdrawn because it's displayed incorrectly.",
      ],
    },
    {
      heading: "Our responsibility to you",
      body: [
        "Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that can't be limited by law. Otherwise, we're responsible for loss you suffer that's a foreseeable result of us breaking these terms, up to the price you paid.",
      ],
    },
    {
      heading: "If something goes wrong",
      body: [
        `Please contact us first at ${contact} and we'll do our best to put it right.`,
        "These terms are governed by the law of England and Wales. You can bring proceedings in the courts of England and Wales, or in Scotland or Northern Ireland if you live there.",
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  description: "What personal information Aqib Plates collects through this website, why we need it, and your rights over it.",
  updated: "2026-10-12",
  intro:
    "This policy explains what personal information we collect through this website, why we need it, who we share it with and the rights you have over it.",
  sections: [
    {
      heading: "Who we are",
      body: [
        `${site.name}, ${address}, is responsible for your personal information. If you have any questions about this policy, email ${contact}.`,
      ],
    },
    {
      heading: "What we collect",
      body: ["We only collect what we need to answer you and deliver what you've ordered:"],
      list: [
        "When you send us a message: your name, email address, the plate you're asking about and your message.",
        "When you use the plate finding service: your first name, email address, phone number, budget and plate idea.",
        "When you buy a registration: your name, billing address, email address, phone number and, if different, the name to go on the V750 certificate. Your card details go straight to Stripe and we never see them.",
        "When you visit the site: our hosting provider keeps short-term server logs, such as IP addresses and the pages requested, to keep the site running securely.",
      ],
    },
    {
      heading: "How we use it",
      body: ["We use your information, and rely on these legal bases, to:"],
      list: [
        "Process your order and have the DVLA issue your V750 certificate (to perform our contract with you).",
        "Carry out the plate finding service you've paid for (contract).",
        "Reply to your messages (our legitimate interest in answering enquiries).",
        "Prevent fraud and keep the site secure (legitimate interests).",
        "Keep the sales records the law requires, for example for tax (legal obligation).",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We never sell your information or use it for marketing unless you ask us to. We share it only with:",
      ],
      list: [
        "The DVLA, to issue your V750 certificate.",
        "Stripe, who process payments.",
        "Resend, who deliver our emails.",
        "Our website hosting provider.",
      ],
    },
    {
      heading: "Transfers outside the UK",
      body: [
        "Some of these providers, such as Stripe and Resend, may process information outside the UK. When they do, it's protected by safeguards recognised under UK law, such as adequacy regulations or the International Data Transfer Agreement.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "This website doesn't use advertising or analytics cookies. If you pay online, Stripe's checkout page uses cookies that are needed to take payment safely and prevent fraud. Our content management area uses cookies only for signed-in staff.",
      ],
    },
    {
      heading: "How long we keep it",
      body: ["We keep your information only as long as we need it:"],
      list: [
        "Messages and plate finding requests: up to 12 months after we last hear from you.",
        "Order records: 6 years after the sale, as required for tax.",
      ],
    },
    {
      heading: "Your rights",
      body: ["Under UK data protection law you have the right to:"],
      list: [
        "Get a copy of the information we hold about you",
        "Have it corrected if it's wrong",
        "Have it deleted, unless we need to keep it by law",
        "Restrict or object to how we use it",
        "Have it sent to you or another organisation in a portable format",
      ],
    },
    {
      heading: "Using your rights",
      body: [
        `To use any of these rights, email ${contact}. We'll reply within one month.`,
        "If you're unhappy with how we've handled your information, please tell us first. You can also complain to the Information Commissioner's Office at [ico.org.uk](https://ico.org.uk/make-a-complaint/) or on 0303 123 1113.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: ["If anything changes we'll update this page. The date at the top shows when it was last updated."],
    },
  ],
};
