import serviceImg from '@/assets/images/Service.png';

export default function ReliableDelivery() {
    return (
        <div className="bg-foreground">
            <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-14 items-center">
                {/* Left Side Image */}
                <img src={serviceImg} alt="Parcel Delivery"/>

                {/* Right Side Content */}
                <div>
                    <h3 className="text-[32px] font-extrabold pb-8 text-background"><span className='text-primary'>Fast, Secure & Reliable</span> Deliveries</h3>
                    <p className="text-accent mb-6">
                        At <span className="font-semibold">ParcelRunner</span>, we ensure that
                        every parcel reaches its destination quickly and safely. Our trained agents,
                        modern tracking system, and customer-first approach make us one of the most
                        trusted parcel delivery solutions in Bangladesh.
                    </p>

                    <ul className="space-y-3 text-accent">
                        <li>🚚 Same-day & express delivery options</li>
                        <li>🔒 100% secure handling of all parcels</li>
                        <li>📍 Real-time live tracking system</li>
                        <li>💳 Cash-on-delivery and multiple payment methods</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}