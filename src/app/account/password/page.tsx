import { Heading } from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { AccountPasswordForm } from "@/features/account/components/account-password-form";
import { AccountTabs } from "@/features/account/components/account-tabs";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8 ">
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="Password"
          description="Keep your account secure"
          tabs={<AccountTabs />}
        />
      </div>
      <div className="w-full max-w-[420px] self-center  animate-fade-from-top">
        <Card>
          <CardContent>
            <AccountPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordPage;
