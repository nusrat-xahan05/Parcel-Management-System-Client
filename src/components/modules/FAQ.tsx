import faqImg from '@/assets/images/faq.png'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "How do I book a parcel delivery with ParcelRunner?",
    content:
      "You can easily book a parcel online by creating an account, entering sender, receiver and parcel details, selecting a delivery option, and confirming payment.",
  },
  {
    id: "2",
    title: "How can I track my parcel?",
    content:
      "After booking, you will receive a unique tracking ID. Simply enter this ID on the ParcelRunner website to get real-time updates on your parcel’s location and status.",
  },
  {
    id: "3",
    title: "What items are restricted from delivery?",
    content:
      "For safety reasons, ParcelRunner does not accept hazardous materials, explosives, perishable items, or illegal goods. Please check our restricted items list before booking.",
  },
  {
    id: "4",
    title: "How long does delivery usually take?",
    content:
      "Delivery time depends on the service you choose. Standard delivery typically takes 2–4 business days, while express delivery can arrive within 24-48 hours.",
  },
  {
    id: "5",
    title: "What should I do if my parcel is delayed or lost?",
    content:
      "If your parcel is delayed, you can track its status online or contact our support team. In rare cases of lost parcels, we provide compensation based on our policy.",
  }
]

export default function FAQ() {
  return (
    <div className='bg-foreground'>
      <div className='mx-auto max-w-7xl'>
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-4 px-4 md:px-6 py-0 sm:py-24">
          <div className='pt-16 sm:pt-0'>
            <img className='w-full sm:w-[80%] md:w-full mb-0 sm:mb-10 md:mb-0 text-center mx-auto' src={faqImg} alt="FAQ Image" />
          </div>
          <div className='pr-0 sm:pr-16 pb-16 sm:pb-0'>
            <h3 className="text-[32px] font-extrabold pb-5 text-background">FAQ</h3>
            <Accordion type="single" collapsible className="w-full" defaultValue="3">
              {items.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="py-2 border-b-2 border-muted-foreground">
                  <AccordionTrigger className="py-2 text-base text-background leading-6 hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-accent/80 pb-2">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
