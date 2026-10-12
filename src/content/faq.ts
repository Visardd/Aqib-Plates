import { site } from "@/lib/site";

// From the FAQ on the current site. Aqib should check the wording before launch.
export const faqs = [
  {
    q: "Are your registrations legal in the UK?",
    a: "Yes. Every registration we sell follows UK regulations and DVLA guidelines.",
  },
  {
    q: "Do you supply the physical number plates?",
    a: "No. We sell the registration itself. Once it's assigned to your vehicle, any registered number plate supplier can make the physical plates.",
  },
  {
    q: "How does the process work?",
    a: "After you buy, we notify the DVLA to issue a new V750 Certificate of Entitlement using the details you give at checkout. The certificate proves the registration is yours, and you use it to put the plate on any eligible vehicle.",
  },
  {
    q: "How long does the V750 certificate take to arrive?",
    a: `Typically ${site.certificateLeadTime}. It depends on DVLA processing times and Royal Mail.`,
  },
  {
    q: "Do I need a car or a driving licence to buy a registration?",
    a: "No. The registration is held on your V750 certificate until you're ready to put it on a vehicle, so it also makes a great gift.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "No. A registration is classed as personalised goods because ownership rights transfer to you, so payments are non-refundable and there is no returns policy. The plate finding service is the one exception: if we can't find a plate that matches your request, you get a full refund of the £9.99 fee.",
  },
  {
    q: "Is the advertised price the final price?",
    a: "Yes. The price covers the full right to display the registration, with no extra or hidden costs.",
  },
  {
    q: "Can I change the spacing on my plates?",
    a: "Spacing must meet DVLA rules for the registration on your V750 or V778. Get in touch before ordering physical plates and we'll confirm what's allowed.",
  },
] as const;
