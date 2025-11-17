
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Baby, AlertTriangle, ShieldCheck } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "milestone",
    title: "Developmental Milestone Unlocked!",
    message: "Your 6-month-old is likely starting to sit up without support. Great job!",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "recall",
    title: "Safety Recall Alert",
    message: "A brand of baby formula you've saved has been recalled. Tap to see details.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "new_feature",
    title: "New Feature: My Lists",
    message: "You can now save products to a 'Safe List' and 'Avoid List' for easier shopping.",
    time: "3 days ago",
    read: true,
  },
];

const ICONS = {
    milestone: <Baby className="w-5 h-5 text-blue-500" />,
    recall: <AlertTriangle className="w-5 h-5 text-red-500" />,
    new_feature: <ShieldCheck className="w-5 h-5 text-green-500" />,
};

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Notifications</h1>
        <div className="w-10" />
      </div>
      <div className="px-6 py-6 space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 flex items-start gap-4 ${
              !notification.read ? "bg-primary/5 border-primary/20" : "bg-card"
            }`}
          >
            <div className="mt-1">{ICONS[notification.type]}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
