import BlurPage from "@/components/blur-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/database/db";
import { AreaChart } from "@tremor/react";
import { Contact2 } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ subAccountId: string }>;
};

const SubaccountPageId = async ({ params }: Props) => {
  let sessions;

  const subAccountId = (await params).subAccountId;

  const subAccountDetails = await db.subAccount.findUnique({
    where: {
      id: subAccountId,
    },
  });

  if (!subAccountDetails) return;

  return (
    <BlurPage>
      <div className="relative h-full">
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className=" text-sm text-muted-foreground flex flex-col gap-12 justify-between ">
                <div className="lg:w-[150px]">
                  Total page visits across all funnels. Hover over to get more
                  details on funnel page performance.
                </div>
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="p-4 flex-1">
              <CardHeader>
                <CardTitle>Checkout Activity</CardTitle>
              </CardHeader>
              <AreaChart
                className="text-sm stroke-primary"
                data={sessions || []}
                index="created"
                categories={["amount_total"]}
                colors={["primary"]}
                yAxisWidth={30}
                showAnimation={true}
              />
            </Card>
          </div>
        </div>
      </div>
    </BlurPage>
  );
};

export default SubaccountPageId;
