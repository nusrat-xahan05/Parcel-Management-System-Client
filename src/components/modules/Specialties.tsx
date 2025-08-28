import { MdOutlineSupportAgent } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { NotepadText } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";

export default function Specialties() {
    return (
        <div className="my-24">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-extrabold pb-5 text-primary">Our Specialties</h3>
                <p className="text-muted-foreground">We've easy-to-use and safe services with a passionate team of logistics experts to building a seamless professional delivery experience.</p>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-14">
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <NotepadText className="size-12" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Cash to Order</h5>
                        <p className="text-muted-foreground">Conveniently pay when you confirm your parcel booking.</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <TbTruckDelivery className="size-16" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Cash on Delivery</h5>
                        <p className="text-muted-foreground">Flexible payment option where receivers pay upon delivery.</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <FaMapLocationDot className="size-12" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Live Tracking</h5>
                        <p className="text-muted-foreground">Monitor your parcel's journey in real-time with status updates.</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <FaPersonBreastfeeding className="size-10" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Delivery Agents</h5>
                        <p className="text-muted-foreground">Ensuring safe & fast parcel transportation</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <GrTechnology className="size-10" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Tech Team</h5>
                        <p className="text-muted-foreground">Building reliable tracking & booking systems</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-border to-primary/50 rounded-2xl px-5 py-6 flex gap-3.5">
                    <MdOutlineSupportAgent className="size-12" />
                    <div>
                        <h5 className="mb-3 text-lg font-medium">Support Team</h5>
                        <p className="text-muted-foreground">Always ready to assist customers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}