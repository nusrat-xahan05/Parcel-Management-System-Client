import FAQ from "@/components/modules/FAQ";
import Banner from "@/components/modules/HomePage/Banner";
import ServiceWorkSteps from "@/components/modules/HomePage/ServiceWorkSteps";
import Specialties from "@/components/modules/Specialties";

export default function HomePage(){
    return (
        <div className="">
            <Banner></Banner>
            <ServiceWorkSteps></ServiceWorkSteps>
            <div className="mx-auto max-w-7xl px-4">
                <Specialties></Specialties>
            </div>
            <FAQ></FAQ>
        </div>
    )
}