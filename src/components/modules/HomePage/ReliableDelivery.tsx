import serviceImg from '@/assets/images/Service.png';

export default function ReliableDelivery() {
    return (
        <div className="bg-foreground">
            <div className="mx-auto max-w-7xl md:grid md:grid-cols-2 md:items-center px-4 md:px-6 md:gap-14">
                {/* Left Side Image */}
                <div>
                    <img className='w-[70%] md:w-full text-center mx-auto' src={serviceImg} alt="Parcel Delivery" />
                </div>

                {/* Right Side Content */}
                <div className='pb-20 md:pb-0 py-0 md:py-14'>
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