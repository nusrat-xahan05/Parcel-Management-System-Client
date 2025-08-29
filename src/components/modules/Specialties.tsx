import { MdOutlineSupportAgent } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { NotepadText } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Specialties() {
    return (
        <div className="py-24 px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-extrabold pb-5 text-foreground">Our Specialties</h3>
                <p className="text-foreground/50">We've easy-to-use and safe services with a passionate team of logistics experts to building a seamless professional delivery experience.</p>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-14">
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <NotepadText className="size-12" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Cash to Order</CardTitle>
                        <p className="text-muted-foreground">Conveniently pay when you confirm your parcel booking.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <TbTruckDelivery className="size-12" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Cash on Delivery</CardTitle>
                        <p className="text-muted-foreground">Flexible payment option where receivers pay upon delivery.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <FaMapLocationDot className="size-12" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Live Tracking</CardTitle>
                        <p className="text-muted-foreground">Monitor your parcel's journey in real-time with status updates.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <FaPersonBreastfeeding className="size-10" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Delivery Agents</CardTitle>
                        <p className="text-muted-foreground">Ensuring safe & fast parcel transportation</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <GrTechnology className="size-10" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Tech Team</CardTitle>
                        <p className="text-muted-foreground">Building reliable tracking & booking systems</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <MdOutlineSupportAgent className="size-12" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3 text-lg font-medium">Support Team</CardTitle>
                        <p className="text-muted-foreground">Always ready to assist customers</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}