import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { EditInfoModal } from "@/components/modules/Admin&User/EditInfoModal";
// import { UpdateUserModal } from "@/components/modules/Admin/User/UpdateUserModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentStatus, Role } from "@/constants/User";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAgentRequestMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ViewProfile() {
    const navigate = useNavigate();
    const { data: userData, isLoading: userLoading } = useUserInfoQuery();
    const [agentRequest] = useAgentRequestMutation();

    const handleAgentRequest = async (userInfo: IUser) => {
        const toastId = toast.loading("Processing...");

        if (!userInfo.name || !userInfo.phone || !userInfo.address) {
            return toast.error("Update Your Profile Information.", { id: toastId });
        }
        try {
            const res = await agentRequest().unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message, { id: toastId });
        }
    };

    return (
        <div className="relative w-full h-screen">
            {
                userLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !userLoading && (
                    <div className="container mx-auto max-w-3xl p-6 mt-7">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">User Information</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => navigate(-1)}>
                                    Go Back
                                </Button>
                                <EditInfoModal profileInfo={userData?.data as IUser}></EditInfoModal>
                            </div>
                        </div>

                        {/* User Details Card */}
                        <Card className="border-l-4 border-l-primary shadow-lg rounded-2xl p-7">
                            <CardHeader className="flex gap-4 items-center">
                                <CircleUserRound className="size-12 sm:size-16" />
                                <div>
                                    <CardTitle className="text-xl sm:text-2xl font-semibold">{userData?.data?.name}</CardTitle>
                                    <p className="text-lg text-muted-foreground">{userData?.data?.email}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pl-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Role</p>
                                        <p className="text-base">{userData?.data?.role}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Verified</p>
                                        <p className="text-base">
                                            {userData?.data?.isVerified ? "✅ Yes" : "❌ No"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{userData?.data?.phone || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Address</p>
                                        <p className="text-base">{userData?.data?.address || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">User Status</p>
                                        <p className="text-base">{userData?.data?.userStatus || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Agent Status</p>
                                        <p className="text-base">{userData?.data?.agentStatus || "Not provided"}</p>
                                    </div>

                                    <div>
                                        <p className="text-base font-medium text-muted-foreground">Created At</p>
                                        <p className="text-base">{userData?.data?.createdAt || "Not provided"}</p>
                                    </div>

                                    <div>
                                        {
                                            ((userData?.data?.role === Role.SENDER) || (userData?.data?.role === Role.RECEIVER)) ? (
                                                <Button
                                                    disabled={(userData?.data?.agentStatus !== AgentStatus.NOT_REQUESTED)}
                                                    onClick={() => handleAgentRequest(userData?.data as IUser)}>Become An Agent</Button>
                                            ) : ''
                                        }

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
