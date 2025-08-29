import FAQ from "@/components/modules/FAQ";
import Banner from "@/components/modules/HomePage/Banner";
import ReliableDelivery from "@/components/modules/HomePage/ReliableDelivery";
import ServiceWorkSteps from "@/components/modules/HomePage/ServiceWorkSteps";
import Specialties from "@/components/modules/Specialties";

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