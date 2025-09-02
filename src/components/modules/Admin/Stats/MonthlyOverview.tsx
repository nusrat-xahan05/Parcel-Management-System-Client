import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IParcelAnalyticsItem } from "@/types/stats.type";


type ChildProps = {
    title: string;
    parcelData: IParcelAnalyticsItem[];
};

export function MonthlyOverview({ title, parcelData }: ChildProps) {
    return (
        <Card className="border-l-4 border-l-primary shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={parcelData}>
                        <XAxis dataKey="_id" tickFormatter={(month) => `M${month}`} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#fe9a00" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
