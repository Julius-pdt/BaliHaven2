"use client";

import { useState } from "react";
import {
  User as UserIcon,
  Calendar,
  Clock,
  XCircle,
  LogOut,
  Edit,
  Key,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatIDR, formatDate } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type TabKey = "upcoming" | "history" | "profile" | "security";

export function UserDashboard() {
  const { user, userBookings, cancelBooking, logout, navigate, openAuth } = useAppStore();
  const [tab, setTab] = useState<TabKey>("upcoming");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <UserIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Please log in</h2>
          <p className="text-sm text-muted-foreground mb-6">
            You need to be logged in to view your dashboard.
          </p>
          <Button
            onClick={() => openAuth("login")}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Login / Register
          </Button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const upcoming = userBookings.filter(
    (b) => new Date(b.checkIn) >= now && b.status !== "CANCELLED",
  );
  const history = userBookings.filter(
    (b) => new Date(b.checkIn) < now || b.status === "CANCELLED",
  );

  const handleSaveProfile = () => {
    if (!profile.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    // In real app, would call API
    setEditing(false);
    toast.success("Profile updated successfully.");
  };

  const handleChangePassword = () => {
    toast.info("Password change link sent to your email.");
  };

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Welcome back, {user.name?.split(" ")[0] || "Guest"}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="ml-auto rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Upcoming Bookings",
              value: upcoming.length,
              icon: Calendar,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Total Trips",
              value: userBookings.length,
              icon: Clock,
              color: "bg-sage/20 text-primary",
            },
            {
              label: "Cancelled",
              value: userBookings.filter((b) => b.status === "CANCELLED").length,
              icon: XCircle,
              color: "bg-destructive/10 text-destructive",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 border border-border/60 flex items-center gap-4"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-muted rounded-full p-1 h-auto">
            <TabsTrigger value="upcoming" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Upcoming ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-full py-2.5 data-[state=active]:bg-card">
              History ({history.length})
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Security
            </TabsTrigger>
          </TabsList>

          {/* Upcoming */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <EmptyBookings
                title="No upcoming trips"
                description="Start planning your next Bali escape."
                cta="Browse Villas"
                onCta={() => navigate("explore")}
              />
            ) : (
              upcoming.map((b) => (
                <BookingRow
                  key={b.id}
                  booking={b}
                  onCancel={() => {
                    cancelBooking(b.id);
                    toast.success("Booking cancelled. Refund will be processed within 7 days.");
                  }}
                  onView={() => navigate("villa-detail", { villaId: b.villaId })}
                />
              ))
            )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            {history.length === 0 ? (
              <EmptyBookings
                title="No booking history"
                description="Your past trips will appear here."
                cta="Browse Villas"
                onCta={() => navigate("explore")}
              />
            ) : (
              history.map((b) => (
                <BookingRow
                  key={b.id}
                  booking={b}
                  isHistory
                  onView={() => navigate("villa-detail", { villaId: b.villaId })}
                />
              ))
            )}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold">Profile Information</h2>
                {!editing ? (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="rounded-full">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="rounded-full">
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile} className="rounded-full bg-primary text-primary-foreground">
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 pb-5 border-b border-border/40">
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-2xl font-bold text-primary">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-serif text-lg font-semibold">{user.name || "Guest"}</div>
                    <div className="text-sm text-muted-foreground">Member since {new Date().getFullYear()}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded bg-primary/10 text-primary">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Full Name
                    </Label>
                    {editing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{user.name || "—"}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </Label>
                    {editing ? (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" /> {user.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Phone
                    </Label>
                    {editing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+62 812 3456 7890"
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        {user.phone || "Not set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Role
                    </Label>
                    <p className="font-medium mt-1 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 max-w-2xl">
              <h2 className="font-serif text-xl font-bold mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Key className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Change Password</div>
                      <div className="text-xs text-muted-foreground">
                        Last changed 3 months ago
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleChangePassword} className="rounded-full">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground">
                        Add an extra layer of security
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("2FA setup would open here.")}
                    className="rounded-full"
                  >
                    Enable
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Sign Out</div>
                      <div className="text-xs text-muted-foreground">
                        Sign out from this device
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logout()}
                    className="rounded-full text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyBookings({
  title,
  description,
  cta,
  onCta,
}: {
  title: string;
  description: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div className="text-center py-16 bg-card rounded-2xl border border-border/40">
      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <Button
        onClick={onCta}
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {cta}
      </Button>
    </div>
  );
}

interface BookingRowProps {
  booking: ReturnType<typeof useAppStore.getState>["userBookings"][0];
  onCancel?: () => void;
  onView: () => void;
  isHistory?: boolean;
}

function BookingRow({ booking, onCancel, onView, isHistory }: BookingRowProps) {
  const statusColor: Record<string, string> = {
    CONFIRMED: "bg-primary/10 text-primary",
    PENDING: "bg-gold/15 text-gold",
    CANCELLED: "bg-destructive/10 text-destructive",
    COMPLETED: "bg-sage/20 text-primary",
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden flex flex-col sm:flex-row">
      {booking.villa && (
        <div className="sm:w-48 aspect-[4/3] sm:aspect-auto flex-shrink-0">
          <img
            src={booking.villa.images[0]?.url}
            alt={booking.villa.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded",
                statusColor[booking.status],
              )}
            >
              {booking.status}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{booking.bookingCode}</span>
          </div>
          {booking.villa && (
            <h3 className="font-serif text-lg font-semibold mb-2">{booking.villa.name}</h3>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formatDate(booking.checkIn)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formatDate(booking.checkOut)}
            </span>
            <span>{booking.nights} nights</span>
            <span>{booking.guests} guests</span>
          </div>
          <div className="mt-3 font-semibold text-sm">
            {formatIDR(booking.totalAmount)}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={onView} className="rounded-full">
            View Villa
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          {!isHistory && booking.status === "CONFIRMED" && onCancel && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full text-destructive hover:text-destructive"
                >
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Refund will be processed according to our
                    cancellation policy (free up to 7 days before check-in).
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">Keep Booking</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onCancel}
                    className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, Cancel Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
