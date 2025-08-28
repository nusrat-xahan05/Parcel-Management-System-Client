import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const items = [
  {
    id: 1,
    title: "Seamless Parcel Booking",
    description:
      "Enable users to effortlessly schedule and manage parcel pickups with a few simple clicks.",
  },
  {
    id: 2,
    title: "Efficient Pickup & Transportation",
    description:
      "Ensure timely and secure collection of parcels by trained delivery agents using optimized routes.",
  },
  {
    id: 3,
    title: "Real-Time Tracking",
    description:
      "Provide live tracking updates so customers can monitor their parcels throughout the delivery journey.",
  },
  {
    id: 4,
    title: "Reliable Cash on Delivery",
    description:
      "Facilitate secure COD transactions, ensuring trust and convenience for both senders and receivers.",
  },
  {
    id: 5,
    title: "Customer Satisfaction & Support",
    description:
      "Maintain high-quality service standards and responsive support to guarantee a smooth delivery experience.",
  },
]

export default function MissionMap() {
  return (
    <Timeline defaultValue={3}>
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=vertical]/timeline:sm:ms-32"
        >
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
            </TimelineDate>
            <TimelineTitle className="sm:-mt-0.5">{item.title}</TimelineTitle>
            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
