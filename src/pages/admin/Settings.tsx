import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { profile, signOut } = useAuth();

  return (
    <>
      <Helmet>
        <title>Settings - Admin</title>
      </Helmet>

      <div className="space-y-8 max-w-xl">
        {/* Profile Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-black">Profile</h2>
            <p className="text-sm text-black/50 mt-1">Your account information</p>
          </div>

          <div className="p-6 border border-black/10 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-medium">
                {profile?.first_name?.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-medium text-black">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-black/50">{profile?.email}</p>
              </div>
            </div>

            <div className="grid gap-4 pt-4">
              <div className="space-y-2">
                <Label className="text-sm">Email</Label>
                <Input value={profile?.email || ""} disabled className="h-9 bg-black/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">First Name</Label>
                  <Input value={profile?.first_name || ""} disabled className="h-9 bg-black/5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Last Name</Label>
                  <Input value={profile?.last_name || ""} disabled className="h-9 bg-black/5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-black">Account</h2>
            <p className="text-sm text-black/50 mt-1">Manage your account</p>
          </div>

          <div className="p-6 border border-black/10 rounded-lg">
            <Button 
              variant="outline" 
              onClick={signOut}
              className="border-black/20 text-black hover:bg-black hover:text-white"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
