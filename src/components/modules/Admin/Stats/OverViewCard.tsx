import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IParcelAnalyticsResponse } from "@/types";

type ChildProps = {
    summary: Partial<IParcelAnalyticsResponse>
};

export function OverviewCard({ summary }: ChildProps) {
    const { totalParcels, pendingParcels, approvedParcels, inTransitParcels, deliveredParcels, confirmedParcels, cancelledParcels, blockedParcels } = summary;
    return (

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6" >
            {
                [
                    { title: "Total Parcels", value: totalParcels, color: "text-primary" },
                    { title: "Pending", value: pendingParcels, color: "text-chart-3" },
                    { title: "Approved", value: approvedParcels, color: "text-chart-3" },
                    { title: "In Transit", value: inTransitParcels, color: "text-chart-4" },
                    { title: "Delivered", value: deliveredParcels, color: "text-chart-3" },
                    { title: "Confirmed", value: confirmedParcels, color: "text-chart-4" },
                    { title: "Cancelled", value: cancelledParcels, color: "text-muted-foreground" },
                    { title: "Blocked", value: blockedParcels, color: "text-muted-foreground" },
                ].map((card) => (
                    <Card className="border-l-4 border-l-primary shadow-lg" key={card.title}>
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}
