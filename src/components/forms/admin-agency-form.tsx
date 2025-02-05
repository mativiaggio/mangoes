import { Agency, Plan, Subscription } from "@prisma/client";
import React from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { formatPriceToARS } from "@/lib/utils";

interface Props {
  agency: Agency & { Subscription?: Subscription | null };
}

const AdminAgencyForm = ({ agency }: Props) => {
  console.log("agency", agency);
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="subscription-status">Subscription Status</Label>
        <Switch
          id="subscription-status"
          checked={agency.Subscription?.active || false}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="plan">Subscription Plan</Label>
        {agency.Subscription?.plan && (
          <Select value={agency.Subscription?.plan} onValueChange={() => {}}>
            <SelectTrigger id="plan">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(Plan).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value.toLocaleUpperCase()}{" "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Precio actual</Label>
        <p className="text-sm">
          {agency.Subscription?.price &&
            formatPriceToARS(agency.Subscription?.price)}
        </p>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => {}}>Update Subscription</Button>
        <Button variant="destructive" onClick={() => {}}>
          Cancel Subscription
        </Button>
      </div>
    </>
  );
};

export default AdminAgencyForm;
