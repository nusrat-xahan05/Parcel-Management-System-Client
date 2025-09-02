import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IParcelAnalyticsItem } from "@/types/stats.type";

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#9ca3af"];

type ChildProps = {
    title: string;
    parcelData: IParcelAnalyticsItem[];
};

export function PieChartCard({ title, parcelData }: ChildProps) {
    const hasData = parcelData && parcelData.length > 0;

    return (
        <Card className="border-l-4 border-l-primary shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-56 flex items-center justify-center">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={parcelData}
                                dataKey="count"
                                nameKey="_id"
                                innerRadius={50}
                                label
                            >
                                {parcelData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-muted-foreground">No data available</p>
                )}
            </CardContent>
        </Card>
    );
}

