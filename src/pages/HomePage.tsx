import FAQ from "@/components/modules/FAQ";
import Banner from "@/components/modules/HomePage/Banner";
import ServiceWorkSteps from "@/components/modules/HomePage/ServiceWorkSteps";

export default function HomePage(){
    return (
        <div>
            <Banner></Banner>
            <ServiceWorkSteps></ServiceWorkSteps>
            <FAQ></FAQ>
        </div>
    )
}