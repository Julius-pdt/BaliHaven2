"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  DollarSign,
  Users,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  TrendingUp,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAppStore } from "@/lib/store";
import { VILLAS, VILLA_REVIEWS, formatIDR, formatDate } from "@/lib/data";
import { DESTINATIONS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const COLORS = ["#3E5C44", "#8FA883", "#D4B896", "#B8A07E", "#6B7B5A", "#A4B89A"];

const monthlyRevenue = [
  { month: "Jan", revenue: 145, bookings: 28 },
  { month: "Feb", revenue: 168, bookings: 32 },
  { month: "Mar", revenue: 210, bookings: 41 },
  { month: "Apr", revenue: 195, bookings: 38 },
  { month: "May", revenue: 234, bookings: 45 },
  { month: "Jun", revenue: 280, bookings: 52 },
  { month: "Jul", revenue: 312, bookings: 58 },
  { month: "Aug", revenue: 345, bookings: 64 },
  { month: "Sep", revenue: 298, bookings: 54 },
  { month: "Oct", revenue: 265, bookings: 48 },
  { month: "Nov", revenue: 220, bookings: 40 },
  { month: "Dec", revenue: 380, bookings: 72 },
];

const destinationData = DESTINATIONS.map((d) => ({
  name: d.name,
  value: VILLAS.filter((v) => v.location === d.name).length,
}));

export function AdminDashboard() {
  const { user, userBookings, openAuth, navigate, logout } = useAppStore();
  const [search, setSearch] = useState("");
  const [villaDialog, setVillaDialog] = useState<{ open: boolean; mode: "create" | "edit"; villa?: typeof VILLAS[0] }>({
    open: false,
    mode: "create",
  });
  const [villaList, setVillaList] = useState(VILLAS);

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0) * 1000000;
  const stats = {
    totalVillas: villaList.length,
    totalBookings: userBookings.length + 542, // demo total
    totalRevenue,
    totalCustomers: 1284,
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Admin Access Required</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Please log in with an admin account to access this dashboard.
          </p>
          <div className="flex flex-col gap-3 items-center">
            <Button
              onClick={() => openAuth("login")}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Login as Admin
            </Button>
            <p className="text-xs text-muted-foreground">
              Use the demo login and select &quot;As Admin&quot;
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredVillas = villaList.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSaveVilla = (data: Partial<typeof VILLAS[0]>) => {
    if (villaDialog.mode === "create") {
      const newVilla = {
        ...VILLAS[0],
        id: `villa-${Date.now()}`,
        slug: (data.name || "new-villa").toLowerCase().replace(/\s+/g, "-"),
        ...data,
        images: VILLAS[0].images, // use placeholder
      } as typeof VILLAS[0];
      setVillaList([newVilla, ...villaList]);
      toast.success("Villa created successfully.");
    } else if (villaDialog.villa) {
      setVillaList(villaList.map((v) => (v.id === villaDialog.villa!.id ? { ...v, ...data } : v)));
      toast.success("Villa updated successfully.");
    }
    setVillaDialog({ open: false, mode: "create" });
  };

  const handleDeleteVilla = (id: string) => {
    setVillaList(villaList.filter((v) => v.id !== id));
    toast.success("Villa deleted.");
  };

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                <LayoutDashboard className="w-3.5 h-3.5" /> Admin Panel
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">Bali Haven Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => logout()} className="rounded-full">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Villas",
              value: stats.totalVillas.toString(),
              icon: Building2,
              change: "+2 this month",
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Total Bookings",
              value: stats.totalBookings.toString(),
              icon: CalendarCheck,
              change: "+12% vs last month",
              color: "bg-sage/20 text-primary",
            },
            {
              label: "Total Revenue",
              value: formatIDR(stats.totalRevenue),
              icon: DollarSign,
              change: "+18% YoY",
              color: "bg-gold/15 text-gold",
            },
            {
              label: "Total Customers",
              value: stats.totalCustomers.toLocaleString(),
              icon: Users,
              change: "+84 new",
              color: "bg-destructive/10 text-destructive",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 border border-border/60">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-primary flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </span>
              </div>
              <div className="font-serif text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card rounded-2xl p-5 sm:p-6 border border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-semibold">Revenue & Bookings</h3>
                <p className="text-xs text-muted-foreground">Last 12 months performance</p>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DD" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7B5A" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7B5A" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E8E5DD",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="revenue" fill="#3E5C44" radius={[4, 4, 0, 0]} name="Revenue (M IDR)" />
                  <Bar dataKey="bookings" fill="#8FA883" radius={[4, 4, 0, 0]} name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border/60">
            <h3 className="font-serif text-lg font-semibold mb-1">Villas by Location</h3>
            <p className="text-xs text-muted-foreground mb-4">Distribution across Bali</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E8E5DD",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-3">
              {destinationData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span>{d.name}</span>
                  </div>
                  <span className="font-medium">{d.value} villas</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend line */}
        <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border/60 mb-8">
          <h3 className="font-serif text-lg font-semibold mb-1">Booking Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly bookings over the year</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DD" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7B5A" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7B5A" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #E8E5DD",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3E5C44"
                  strokeWidth={3}
                  dot={{ fill: "#3E5C44", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Management tabs */}
        <Tabs defaultValue="villas">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-muted rounded-full p-1 h-auto">
            <TabsTrigger value="villas" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Villas
            </TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="customers" className="rounded-full py-2.5 data-[state=active]:bg-card">
              Customers
            </TabsTrigger>
          </TabsList>

          {/* Villas tab */}
          <TabsContent value="villas">
            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-5 border-b border-border/40 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="font-serif text-lg font-semibold">Manage Villas</h3>
                  <p className="text-xs text-muted-foreground">Create, edit, or remove villa listings</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search villas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 w-48 sm:w-64"
                    />
                  </div>
                  <Button
                    onClick={() => setVillaDialog({ open: true, mode: "create" })}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Villa
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Villa</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price/Night</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVillas.slice(0, 8).map((villa) => (
                      <TableRow key={villa.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <img
                              src={villa.images[0]?.url}
                              alt={villa.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="line-clamp-1">{villa.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{villa.location}</TableCell>
                        <TableCell>{formatIDR(villa.pricePerNight)}</TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                            {villa.rating.toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              villa.active
                                ? "border-primary/40 text-primary"
                                : "border-destructive/40 text-destructive",
                            )}
                          >
                            {villa.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate("villa-detail", { villaId: villa.id })}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setVillaDialog({ open: true, mode: "edit", villa })}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteVilla(villa.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Bookings tab */}
          <TabsContent value="bookings">
            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-5 border-b border-border/40">
                <h3 className="font-serif text-lg font-semibold">Manage Bookings</h3>
                <p className="text-xs text-muted-foreground">View and update booking statuses</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Villa</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userBookings.length > 0 ? (
                      userBookings.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell className="font-mono text-xs">{b.bookingCode}</TableCell>
                          <TableCell>{b.guestName}</TableCell>
                          <TableCell className="max-w-[180px] truncate">
                            {b.villa?.name || "—"}
                          </TableCell>
                          <TableCell>{formatDate(b.checkIn)}</TableCell>
                          <TableCell>{formatIDR(b.totalAmount)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                b.status === "CONFIRMED" && "border-primary/40 text-primary",
                                b.status === "PENDING" && "border-gold/40 text-gold",
                                b.status === "CANCELLED" && "border-destructive/40 text-destructive",
                              )}
                            >
                              {b.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No bookings yet. They will appear here once customers book.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Reviews tab */}
          <TabsContent value="reviews">
            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-5 border-b border-border/40">
                <h3 className="font-serif text-lg font-semibold">Customer Reviews</h3>
                <p className="text-xs text-muted-foreground">Monitor and moderate guest feedback</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Author</TableHead>
                      <TableHead>Villa</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {VILLA_REVIEWS.slice(0, 8).map((r) => {
                      const villa = VILLAS.find((v) => v.id === r.villaId);
                      return (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.authorName}</TableCell>
                          <TableCell className="max-w-[140px] truncate">{villa?.name || "—"}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                              {r.rating}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-muted-foreground">
                            {r.comment}
                          </TableCell>
                          <TableCell className="text-xs">{formatDate(r.createdAt)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Customers tab */}
          <TabsContent value="customers">
            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-5 border-b border-border/40">
                <h3 className="font-serif text-lg font-semibold">Recent Customers</h3>
                <p className="text-xs text-muted-foreground">View customer activity</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Sarah Mitchell", email: "sarah.m@example.com", bookings: 3, spent: 18500000, joined: "2024-03-15" },
                      { name: "James Chen", email: "james.c@example.com", bookings: 2, spent: 11200000, joined: "2024-05-20" },
                      { name: "Olivia Park", email: "olivia.p@example.com", bookings: 4, spent: 24300000, joined: "2024-01-08" },
                      { name: "Marcus Lindberg", email: "marcus.l@example.com", bookings: 1, spent: 6800000, joined: "2024-08-30" },
                      { name: "Isabella Rossi", email: "bella.r@example.com", bookings: 2, spent: 15600000, joined: "2024-06-12" },
                    ].map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.bookings}</TableCell>
                        <TableCell>{formatIDR(c.spent)}</TableCell>
                        <TableCell className="text-xs">{formatDate(c.joined)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Villa form dialog */}
      <VillaFormDialog
        key={`${villaDialog.mode}-${villaDialog.villa?.id ?? "new"}-${villaDialog.open}`}
        open={villaDialog.open}
        mode={villaDialog.mode}
        villa={villaDialog.villa}
        onClose={() => setVillaDialog({ open: false, mode: "create" })}
        onSave={handleSaveVilla}
      />
    </div>
  );
}

interface VillaFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  villa?: typeof VILLAS[0];
  onClose: () => void;
  onSave: (data: Partial<typeof VILLAS[0]>) => void;
}

function VillaFormDialog({ open, mode, villa, onClose, onSave }: VillaFormDialogProps) {
  const [form, setForm] = useState({
    name: villa?.name || "",
    location: villa?.location || "Ubud",
    description: villa?.description || "",
    pricePerNight: villa?.pricePerNight?.toString() || "",
    bedrooms: villa?.bedrooms?.toString() || "2",
    bathrooms: villa?.bathrooms?.toString() || "2",
    maxGuests: villa?.maxGuests?.toString() || "4",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.pricePerNight) {
      toast.error("Please fill in name and price.");
      return;
    }
    onSave({
      name: form.name,
      location: form.location,
      description: form.description,
      pricePerNight: parseFloat(form.pricePerNight),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      maxGuests: parseInt(form.maxGuests),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {mode === "create" ? "Add New Villa" : "Edit Villa"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="v-name">Villa Name *</Label>
            <Input
              id="v-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Tropical Paradise Villa"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="v-location">Location</Label>
              <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                <SelectTrigger id="v-location" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((d) => (
                    <SelectItem key={d.slug} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="v-price">Price per Night (IDR) *</Label>
              <Input
                id="v-price"
                type="number"
                value={form.pricePerNight}
                onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
                placeholder="3500000"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="v-beds">Bedrooms</Label>
              <Input
                id="v-beds"
                type="number"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="v-baths">Bathrooms</Label>
              <Input
                id="v-baths"
                type="number"
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="v-guests">Max Guests</Label>
              <Input
                id="v-guests"
                type="number"
                value={form.maxGuests}
                onChange={(e) => setForm({ ...form, maxGuests: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="v-desc">Description</Label>
            <Textarea
              id="v-desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              placeholder="Describe the villa's unique features..."
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {mode === "create" ? "Create Villa" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
