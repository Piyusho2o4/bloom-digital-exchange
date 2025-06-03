
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AccountToggleProps {
  isDemoAccount: boolean;
  setIsDemoAccount: (value: boolean) => void;
}

export function AccountToggle({ isDemoAccount, setIsDemoAccount }: AccountToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border border-border">
      <Label htmlFor="account-mode" className="text-sm">
        Live
      </Label>
      <Switch
        id="account-mode"
        checked={isDemoAccount}
        onCheckedChange={setIsDemoAccount}
      />
      <Label htmlFor="account-mode" className="text-sm font-medium text-green-400">
        Demo
      </Label>
    </div>
  );
}
