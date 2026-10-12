// Buyer guides. Written to answer the questions people search before buying a plate,
// and to link them on to plates for sale. Facts checked against GOV.UK on 12 Oct 2026;
// Aqib should check the wording before launch. Body text supports [links](/path).

export type GuideSection = { heading: string; body: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-buy-a-private-number-plate",
    title: "How to buy a private number plate",
    description:
      "A step-by-step guide to buying a private number plate in the UK, from choosing a registration to getting your V750 certificate and putting it on your car.",
    updated: "2026-10-12",
    intro:
      "Buying a private registration is simpler than most people expect. You don't need a car, you don't need to visit the DVLA, and the paperwork can be handled for you. Here's how it works from start to finish.",
    sections: [
      {
        heading: "1. Choose a registration",
        body: [
          "Start with what you want the plate to say: initials, a name, a word, or a number that means something to you. Dealers often use numbers that read as letters, so 5 can stand for S and 1 for I. Browse our [private plates for sale](/plates), or use our [plate finding service](/plate-request) if you can't see the one you want.",
          "Check the registration can go on your vehicle. You can't use a registration that makes a vehicle look newer than it is. Dateless plates can go on any vehicle (see our guide to [number plate formats](/guides/number-plate-formats-explained)).",
        ],
      },
      {
        heading: "2. Pay for the registration",
        body: [
          "When you buy, you're buying the right to display the registration, not physical plates. At Aqib Plates the advertised price is the final price, with no extra fees at checkout.",
        ],
      },
      {
        heading: "3. Receive your V750 certificate",
        body: [
          "After your purchase, the DVLA issues a [V750 Certificate of Entitlement](/guides/what-is-a-v750-certificate) in your name (or the name of the person you're buying it for). It proves you have the right to the registration. It usually arrives within about two weeks.",
        ],
      },
      {
        heading: "4. Put it on your vehicle, or keep it",
        body: [
          "You can assign the registration to any eligible vehicle registered in your name, or in someone else's name if they're the nominee on the certificate. Most people do this online at [GOV.UK](https://www.gov.uk/personalised-vehicle-registration-numbers) in a few minutes, and our guide to [putting a private plate on your car](/guides/how-to-transfer-a-private-plate) walks you through it.",
          "There's no rush. The certificate is valid for 10 years and is free to renew, so you can keep the registration until you're ready.",
        ],
      },
      {
        heading: "5. Get your physical plates made",
        body: [
          "Once the registration is on your vehicle, order plates from a registered number plate supplier. You'll need to show your V5C logbook and ID, and the plates must follow the [number plate rules](/guides/number-plate-rules). Tell your insurer about the new registration.",
        ],
      },
    ],
  },
  {
    slug: "what-is-a-v750-certificate",
    title: "What is a V750 Certificate of Entitlement?",
    description:
      "The V750 Certificate of Entitlement proves you own the right to a private registration. Here's what it is, how long it lasts and how to use it.",
    updated: "2026-10-12",
    intro:
      "If you buy a private number plate that isn't already on a vehicle, it's held on a V750 Certificate of Entitlement. It's the document that proves the registration is yours.",
    sections: [
      {
        heading: "What the V750 shows",
        body: ["The certificate is issued by the DVLA and includes:"],
        list: [
          "The registration number",
          "The name of the grantee (the owner of the right)",
          "The name of a nominee, if there is one (someone the plate can be assigned to)",
          "A document reference number, which you need to assign the plate online",
          "The expiry date",
        ],
      },
      {
        heading: "V750 or V778?",
        body: [
          "A V750 is issued when a registration is bought and hasn't been on a vehicle yet. A V778 Retention Document is issued when a registration is taken off a vehicle and kept. Both work the same way when you want to put the registration on a vehicle.",
        ],
      },
      {
        heading: "How long a V750 lasts",
        body: [
          "Certificates are valid for 10 years and are free to renew. You can apply to renew up to 28 days before the expiry date. If you don't renew on or before that date, you permanently lose the right to the registration, so keep an eye on it.",
        ],
      },
      {
        heading: "Using your V750",
        body: [
          "To put the registration on a vehicle, use the reference number on the V750 together with the vehicle's V5C logbook. Our guide to [putting a private plate on your car](/guides/how-to-transfer-a-private-plate) covers the vehicle requirements and each step.",
        ],
      },
      {
        heading: "Keep it safe",
        body: [
          "Store your certificate somewhere safe. If it's lost or damaged, contact the DVLA to ask about a replacement.",
        ],
      },
    ],
  },
  {
    slug: "how-to-transfer-a-private-plate",
    title: "How to put a private plate on your car",
    description:
      "How to assign a private registration from a V750 certificate to your vehicle, what you need, how long it takes and what happens to your old plate.",
    updated: "2026-10-12",
    intro:
      "Once your V750 certificate arrives, putting the registration on your car (called 'assigning' it) usually takes a few minutes online.",
    sections: [
      {
        heading: "What you need",
        body: ["Before you start, have these to hand:"],
        list: [
          "The [V750 (or V778) certificate](/guides/what-is-a-v750-certificate) with its document reference number",
          "The V5C logbook for the vehicle",
          "A vehicle registered with the DVLA in the UK that can move under its own power and is available for inspection",
          "A vehicle that needs an MOT or HGV test (historic vehicles need a current MOT even if they're normally exempt)",
          "A vehicle that has been taxed or SORN continuously for the past 5 years (if it's been SORN for longer, it must be taxed and have an MOT)",
        ],
      },
      {
        heading: "Assigning the registration",
        body: [
          "Use the DVLA's online service on [GOV.UK](https://www.gov.uk/personalised-vehicle-registration-numbers/keep-or-assign) to assign the number. If the vehicle doesn't need an inspection, an online application is assigned straight away, so have your new plates ready: you must fit them before you next drive the vehicle. You can also apply by post.",
          "The DVLA then sends a new V5C logbook showing the new registration. The vehicle's original registration is kept on record and goes back on the vehicle if you ever take the private number off. If the vehicle already has a private number, take that off first or you could lose the right to it.",
        ],
      },
      {
        heading: "After assigning",
        body: ["Once the new registration is on the vehicle:"],
        list: [
          "Order physical plates from a registered number plate supplier that follow the [number plate rules](/guides/number-plate-rules)",
          "Tell your insurer about the change",
          "Update any parking permits, toll accounts or breakdown cover that use the registration",
        ],
      },
      {
        heading: "Can't assign it yet?",
        body: [
          "That's fine. The registration stays safely on the certificate until you're ready, as long as the certificate is in date. You can't put a private number on a Q-registered vehicle.",
        ],
      },
    ],
  },
  {
    slug: "number-plate-rules",
    title: "UK number plate rules: spacing, fonts and fines",
    description:
      "The legal rules for displaying a private number plate in the UK, including spacing, fonts, colours and the fines for misrepresented plates.",
    updated: "2026-10-12",
    intro:
      "A private registration is only worth having if it's displayed legally. The rules are strict, and police and MOT testers do check them.",
    sections: [
      {
        heading: "The key rules",
        body: ["Number plates on UK roads must:"],
        list: [
          "Show black characters on a white plate at the front and a yellow plate at the rear, made from reflective material",
          "Use the standard Charles Wright typeface, in a single shade of black, at the correct character size and spacing",
          "Have no background pattern, and no characters that are removable, rearranged or altered to be hard to read",
          "Be made by a registered number plate supplier, show who supplied them, and carry the British Standard mark (BS AU 145e for plates fitted from 1 September 2021)",
        ],
      },
      {
        heading: "Spacing",
        body: [
          "Characters must keep the spacing shown on your registration document. Moving gaps or using fixing screws to change how letters read counts as misrepresenting the registration, even if it spells a word more clearly. Ask us before ordering plates and we'll confirm what's allowed.",
        ],
      },
      {
        heading: "Flags and identifiers",
        body: [
          "You can show one approved flag on the left of the plate, above a national identifier: the Union flag, the Cross of St George, the Saltire or the Red Dragon of Wales, with identifiers such as UK, GB, ENG, SCO or CYM. Neither can go in the margin or be more than 50mm wide. Fully zero-emission vehicles can also show a green flash.",
        ],
      },
      {
        heading: "Penalties",
        body: [
          "Driving with incorrectly displayed number plates can bring a fine of up to £1,000 and means the vehicle will fail its MOT. The DVLA can also withdraw a private registration that keeps being misrepresented. Full details are on [GOV.UK](https://www.gov.uk/displaying-number-plates).",
        ],
      },
    ],
  },
  {
    slug: "number-plate-formats-explained",
    title: "Dateless, prefix, suffix and current plates explained",
    description:
      "How UK number plate formats work, from dateless registrations to the current style, and which plates can go on which vehicles.",
    updated: "2026-10-12",
    intro:
      "Every UK registration follows one of a few formats. The format decides which vehicles it can go on, because a registration can never make a vehicle look newer than it is.",
    sections: [
      {
        heading: "Current style (2001 onwards)",
        body: [
          "Two letters, two numbers, then three letters, like AB12 CDE. The numbers are an age identifier showing when the vehicle was registered. You can put a current-style plate on a vehicle registered at the same time or later, but not on an older one.",
        ],
      },
      {
        heading: "Prefix (1983 to 2001)",
        body: [
          "A letter, up to three numbers, then three letters, like A123 BCD. The first letter shows the year of registration, and the same age rule applies.",
        ],
      },
      {
        heading: "Suffix (1963 to 1983)",
        body: [
          "Three letters, up to three numbers, then a single year letter, like ABC 123D. These suit older vehicles or anyone after a classic look.",
        ],
      },
      {
        heading: "Dateless",
        body: [
          "Dateless registrations have no year identifier, like 1 ABC or AB 1234. Because they don't show an age, they can go on any vehicle, which makes short dateless plates some of the most sought after. See which ones are [for sale now](/plates).",
        ],
      },
      {
        heading: "Which plates fit your car?",
        body: [
          "If a registration is dateless or older than your vehicle, you're fine. If you're not sure, [send us](/contact) the plate and your vehicle's registration year and we'll check before you buy.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
