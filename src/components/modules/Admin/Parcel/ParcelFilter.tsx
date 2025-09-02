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
import type { TParcelStatus, TParcelType } from "@/types/parcel.type";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function ParcelFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedStatus = searchParams.get("currentStatus") || undefined;
    const selectedParcelType = searchParams.get("parcelType") || undefined;
    const [searchSenderEmail, setSearchSenderEmail] = useState(searchParams.get("senderEmail") || undefined);
    const [searchReceiverEmail, setSearchReceiverEmail] = useState(searchParams.get("receiverEmail") || undefined);

    const currentStatuses: TParcelStatus[] = ['REQUESTED', "APPROVED", "DISPATCHED", "IN TRANSIT", "OUT FOR DELIVERY", "DELIVERED", "CONFIRMED", "CANCELLED", "BLOCKED"];
    const parcelTypes :TParcelType[] = ['FRAGILE', "CLOTHES", "ELECTRONICS", "FOOD ITEMS", "MEDICAL", "DOCUMENTS", "OTHERS"]

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("currentStatus", value);
        setSearchParams(params);
    };

    const handleParcelTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("parcelType", value);
        setSearchParams(params);
    };

    const handleSenderEmailChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("senderEmail", value);
        setSearchParams(params);
    };

    const handleReceiverEmailChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("receiverEmail", value);
        setSearchParams(params);
    };

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("currentStatus");
        params.delete("parcelType");
        params.delete("senderEmail");
        params.delete("receiverEmail");
        setSearchParams(params);
        setSearchSenderEmail('');
        setSearchReceiverEmail('')
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
                    <Label className="mb-2">Parcel Status</Label>
                    <Select
                        onValueChange={(value) => handleStatusChange(value)}
                        value={selectedStatus ? selectedStatus : ""}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                {currentStatuses.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">Parcel Type</Label>
                    <Select
                        onValueChange={(value) => handleParcelTypeChange(value)}
                        value={selectedParcelType ? selectedParcelType : ""}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                {parcelTypes.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
                <div>
                    <Label className="mb-2">Search by Sender Email</Label>
                    <input
                        type="text"
                        placeholder="Search by Sender email"
                        value={searchSenderEmail}
                        onChange={(e) => {
                            setSearchSenderEmail(e.target.value);
                            handleSenderEmailChange(e.target.value);
                        }}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <Label className="mb-2">Search by Receiver Email</Label>
                    <input
                        type="text"
                        placeholder="Search by Receiver email"
                        value={searchReceiverEmail}
                        onChange={(e) => {
                            setSearchReceiverEmail(e.target.value);
                            handleReceiverEmailChange(e.target.value);
                        }}
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>
        </div>
    );
}