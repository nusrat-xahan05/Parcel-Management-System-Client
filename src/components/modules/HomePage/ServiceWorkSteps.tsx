import { Handshake, NotepadText, Send, Truck } from "lucide-react"

export default function ServiceWorkSteps() {
    return (
        <div className="mx-auto max-w-7xl py-20 px-4 bg-secondary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5 text-center space-y-6 lg:space-y-0">
                <div>
                    <NotepadText className="p-2 bg-primary size-11 rounded-md mx-auto"></NotepadText>
                    <h5 className="my-3 text-lg font-medium">Booking</h5>
                    <p className="text-muted-foreground">
                        Easily book your parcels online with our fast and hassle-free system.
                    </p>
                </div>
                <div>
                    <Handshake className="p-2 bg-primary size-11 rounded-md mx-auto"></Handshake>
                    <h5 className="my-3 text-lg font-medium">Picking</h5>
                    <p className="text-muted-foreground">
                        Our trusted agents ensure safe and convenient parcel pickup from your doorstep.
                    </p>
                </div>
                <div>
                    <Truck className="p-2 bg-primary size-11 rounded-md mx-auto"></Truck>
                    <h5 className="my-3 text-lg font-medium">Transportation</h5>
                    <p className="text-muted-foreground">
                        Reliable and secure transportation guarantees your parcel moves quickly across locations.
                    </p>
                </div>
                <div>
                    <Send className="p-2 bg-primary size-11 rounded-md mx-auto"></Send>
                    <h5 className="my-3 text-lg font-medium">Delivery</h5>
                    <p className="text-muted-foreground">
                        Experience timely, safe, and seamless delivery right to your recipient’s hands.
                    </p>
                </div>
            </div>
        </div>
    )
}