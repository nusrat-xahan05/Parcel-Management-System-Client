import missionImg from "@/assets/images/mission.png"
import { lazy } from "react";
const MissionMap = lazy(() => import("@/components/modules/MissionMap"));
const Specialties = lazy(() => import("@/components/modules/Specialties"));

export default function About() {
    return (
        <div className="mx-auto max-w-7xl py-10 px-4">
            <div className="max-w-5xl mx-auto text-center mb-24">
                <h3 className="text-3xl font-extrabold text-primary">About Us</h3>
                <p className="mt-8">
                    ParcelRunner is a modern parcel delivery system built to simplify how you
                    send and receive packages. Whether it's a small document, an important
                    business shipment, or a personal gift, we provide a trusted and efficient
                    service for every delivery need. With our easy-to-use booking platform, you can schedule pickups from your
                    home or office, track your parcel in real time, and stay updated on every
                    step of the journey. We work with dedicated delivery agents who ensure
                    parcels are handled with care and delivered safely to the right hands.
                </p>
                <p>
                    Our services include <span className="font-medium">door-to-door delivery</span>,
                    <span className="font-medium">same-day express service</span>, and
                    <span className="font-medium">long-distance shipping</span>. Whether local
                    or regional, we focus on providing a seamless delivery experience for both
                    individuals and businesses.
                </p>
            </div>

            <div className="my-30">
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-3xl font-extrabold pb-5 text-primary">Our Mission</h3>
                    <p className="text-muted-foreground">Our mission is simple:{" "}<span className="italic">“To deliver trust, speed, and security with every parcel.”</span>{" "} We simplify logistics, ensure timely deliveries, and offer an exceptional experience for both senders and receivers.</p>
                </div>
                <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 hidden md:block">
                        <img src={missionImg} alt="" />
                    </div>
                    <div className="md:col-span-2">
                        <MissionMap></MissionMap>
                    </div>
                </div>
            </div>

            <Specialties></Specialties>
        </div>
    )
}