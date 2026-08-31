import { Heading } from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { AccountUpdateForm } from "@/features/account/components/account-update-form";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { AccountTabs } from "../_navigation/tabs";

const ProfilePage = async () => {
  const { user } = await getAuthOrRedirect();

  return (
    <div className="flex-1 flex flex-col gap-y-8 ">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTabs />}
      />
      <div className="w-full max-w-[420px] self-center  animate-fade-from-top">
        <Card>
          <CardContent>
            <AccountUpdateForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
