import { Link } from 'react-router'
import bannerImg from './../../../assets/images/banner.jpg'
import { ArrowRight } from 'lucide-react'

export default function Banner() {
    return (
        <div className="bg-white md:grid md:grid-cols-2 md:items-center md:gap-4 px-4 md:px-6 py-24 sm:py-32 md:py-10 lg:py-0">
            <div className="text-left mx-auto max-w-7xl">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    We Provide<strong className="text-primary"> Fast Secure Reliable </strong>Parcel Delivery
                </h1>
                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                    Send and receive parcels with confidence — real-time tracking, trusted agents, and hassle-free delivery at your fingertips.
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                    <Link className='inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-gray-700' to='/login'>Get Started</Link>

                    <Link className='rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 flex gap-1.5 items-center' to='/track-parcel'>
                        <p className=''>Track Parcel</p>
                        <ArrowRight></ArrowRight>
                    </Link>
                </div>
            </div>

            <div>
                <img src={bannerImg} alt="Parcel Delivery" />
            </div>
        </div>
    )
}