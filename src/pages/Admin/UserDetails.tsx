import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { UpdateUserModal } from "@/components/modules/Admin/UpdateUserModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSingleUserInfoQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { CircleUserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function UserDetails() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();;
    const { data, isLoading: singleUserLoading } = useSingleUserInfoQuery(id!);

    return (
        <div className="relative w-full h-screen">
            {
                singleUserLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !singleUserLoading && (
                    <div className="container mx-auto max-w-3xl p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">User Information</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => navigate(-1)}>
                                    Go Back
                                </Button>
                                <UpdateUserModal profileInfo={data?.data as IUser}></UpdateUserModal>
                            </div>
                        </div>

                        {/* User Details Card */}
                        <Card className="border-l-4 border-l-primary shadow-lg rounded-2xl p-7">
                            <CardHeader className="flex gap-4 items-center">
                                <CircleUserRound className="size-16" />
                                <div>
                                    <CardTitle className="text-2xl font-semibold">{data?.data?.name}</CardTitle>
                                    <p className="text-lg text-muted-foreground">{data?.data?.email}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pl-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Role</p>
                                        <p className="text-base">{data?.data?.role}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Verified</p>
                                        <p className="text-base">
                                            {data?.data?.isVerified ? "✅ Yes" : "❌ No"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{data?.data?.phone || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Address</p>
                                        <p className="text-base">{data?.data?.address || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">User Status</p>
                                        <p className="text-base">{data?.data?.userStatus || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Agent Status</p>
                                        <p className="text-base">{data?.data?.agentStatus || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Created At</p>
                                        <p className="text-base">{data?.data?.createdAt || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Updated At</p>
                                        <p className="text-base">{data?.data?.updatedAt || "Not provided"}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </div>
    );
}
