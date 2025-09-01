import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { TRole } from "@/types";
import type { TAgentStatus, TUserStatus } from "@/types/user.type";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function UserFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedRole = searchParams.get("role") || undefined;
    const selectedUserStatus = searchParams.get("userStatus") || undefined;
    const selectedAgentRequest = searchParams.get("agentStatus") || undefined;
    const [searchEmail, setSearchEmail] = useState(searchParams.get("email") || undefined);


    const roleTypes: TRole[] = ["ADMIN", "AGENT", "SENDER", "RECEIVER"];
    const userStatuses: TUserStatus[] = ["ACTIVE", "BLOCKED"];
    const agentRequestes: TAgentStatus[] = ['NOT_REQUESTED', "PENDING", "APPROVED", "REJECTED"];

    const handleRoleChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("role", value);
        setSearchParams(params);
    };

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("userStatus", value);
        setSearchParams(params);
    };

    const handleRequestChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("agentStatus", value);
        setSearchParams(params);
    };

    const handleEmailChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("email", value);
        setSearchParams(params);
    };

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("role");
        params.delete("userStatus");
        params.delete("agentStatus");
        params.delete("email");
        setSearchParams(params);
    };

    return (
        <div className="border border-muted rounded-md p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button size="sm" variant="outline" onClick={handleClearFilter}>
                    Clear Filter
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
                <div>
                    <Label className="mb-2">User Role</Label>
                    <Select
                        onValueChange={(value) => handleRoleChange(value)}
                        value={selectedRole ? selectedRole : ""}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                {roleTypes.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">User Status</Label>
                    <Select
                        onValueChange={(value) => handleStatusChange(value)}
                        value={selectedUserStatus ? selectedUserStatus : ""}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                {userStatuses.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">User Agent Request</Label>
                    <Select
                        onValueChange={(value) => handleRequestChange(value)}
                        value={selectedAgentRequest ? selectedAgentRequest : ""}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Request</SelectLabel>
                                {agentRequestes.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                <div>
                    <Label className="mb-2">Search by Email</Label>
                    <input
                        type="text"
                        placeholder="Search by email"
                        value={searchEmail}
                        onChange={(e) => {
                            setSearchEmail(e.target.value);
                            handleEmailChange(e.target.value);
                        }}
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>
        </div>
    );
}