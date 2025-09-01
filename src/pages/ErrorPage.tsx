import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <div className="w-[70%] mx-auto bg-gray-200 rounded-4xl py-14 my-28 text-center">
            <h3 className="font-bold text-[40px] text-[#0B0B0B]">Error 404</h3>
            <p className="font-normal text-xl text-[rgba(11,11,11,0.7)]">Page Not Found</p>

            <Button 
                onClick={() => navigate('/')}
                className="mt-3 px-[22px] py-[11px] rounded-2xl border-2 font-bold text-lg">
                Go Home
            </Button>
        </div>
    );
};

export default ErrorPage;