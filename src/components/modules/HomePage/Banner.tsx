import bannerImg from './../../../assets/images/banner.jpg'

export default function Banner() {
    return (
        <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
                <div className="max-w-prose text-left">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        We Provide<strong className="text-indigo-600"> Fast Secure Reliable </strong>Parcel Delivery
                    </h1>
                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Send and receive parcels with confidence — real-time tracking, trusted agents, and hassle-free delivery at your fingertips.
                    </p>

                    <div className="mt-4 flex gap-4 sm:mt-6">
                        <a className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                            href="#">Get Started
                        </a>

                        <a className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            href="#">Learn More
                        </a>
                    </div>
                </div>

                <div>
                    <img src={bannerImg} alt="Parcel Delivery" />
                </div>
            </div>
        </section>
    )
}