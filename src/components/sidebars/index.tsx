import { getAuthUserDetails, getWebsiteByAgencyId } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;
  if (!user.Agency) return;

  const website = await getWebsiteByAgencyId(user.Agency.id);

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabeledAgency = user.Agency.whiteLabel;
  if (!details) return null;

  let sidebarLogo = user.Agency.agencyLogo || "/assets/svg/hexagon.svg";

  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        website={website || undefined}
        id={id}
        sidebarLogo={sidebarLogo}
        subAccounts={subaccounts}
        user={user}
      />

      <MenuOptions
        details={details}
        website={website || undefined}
        id={id}
        sidebarLogo={sidebarLogo}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
