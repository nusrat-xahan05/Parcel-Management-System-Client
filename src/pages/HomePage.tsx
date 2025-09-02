import { lazy } from "react";
const Banner = lazy(() => import("@/components/modules/HomePage/Banner"));
const FAQ = lazy(() => import("@/components/modules/FAQ"));
const ReliableDelivery = lazy(() => import("@/components/modules/HomePage/ReliableDelivery"));
const ServiceWorkSteps = lazy(() => import("@/components/modules/HomePage/ServiceWorkSteps"));
const Specialties = lazy(() => import("@/components/modules/Specialties"));

export default function HomePage(){
    return (
        <div className="">
            <Banner></Banner>
            <ServiceWorkSteps></ServiceWorkSteps>
            <ReliableDelivery></ReliableDelivery>
            <div className="mx-auto max-w-7xl">
                <Specialties></Specialties>
            </div>
            <FAQ></FAQ>
        </div>
    )
}