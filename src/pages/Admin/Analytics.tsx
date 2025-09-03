import { useParcelStatsQuery } from "@/redux/features/stats/stats.api";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { PieChartCard } from "@/components/modules/Admin/Stats/PieChatCard";
import { OverviewCard } from "@/components/modules/Admin/Stats/OverViewCard";
import { toast } from "sonner";
import { MonthlyOverview } from "@/components/modules/Admin/Stats/MonthlyOverview";

export default function Analytics() {
    const { data: parcelStatsData, isLoading: allParcelAnalyticsLoading, isError } = useParcelStatsQuery();

    if (isError) {
        return toast.error('Error fetching analytics');
    }

    return (
        <div className="relative w-full h-screen">
            {
                allParcelAnalyticsLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !allParcelAnalyticsLoading && (
                    <div className="space-y-8 p-6">
                        <h1 className="text-2xl font-bold">Parcel Analytics Dashboard</h1>

                        <OverviewCard summary={parcelStatsData?.data ?? {}} />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <PieChartCard title="Status Distribution" parcelData={parcelStatsData?.data?.parcelsByStatus ?? []} />
                            <MonthlyOverview title="Monthly Shipments" parcelData={parcelStatsData?.data?.monthlyParcels ?? []} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PieChartCard title="Service Type" parcelData={parcelStatsData?.data?.parcelsByServiceType ?? []} />
                            <PieChartCard title="Parcel Type" parcelData={parcelStatsData?.data?.parcelsByParcelType ?? []} />
                            <PieChartCard title="Delivery Type" parcelData={parcelStatsData?.data?.parcelsByDeliveryType ?? []} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
