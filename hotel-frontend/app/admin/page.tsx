"use client";

import { useEffect, useState } from "react";

interface AdminStats {
    totalBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const userRes = await fetch("http://localhost:4000/auth/me", {
                    credentials: "include",
                });
                if (!userRes.ok) {
                    window.location.href = "/";
                    return;
                }
                const user = await userRes.json();
                if (user.role !== "ADMIN") {
                    window.location.href = "/";
                    return;
                }
                const statsRes = await fetch(
                    "http://localhost:4000/bookings/admin/stats",
                    { credentials: "include" }
                );
                if (!statsRes.ok) throw new Error();
                const data: AdminStats = await statsRes.json();
                setStats(data);
            } catch {
                setError("Unauthorized or failed to load data");
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading Dashboard...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">
                    Admin Dashboard
                </h1>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Bookings"
                        value={stats!.totalBookings}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Confirmed"
                        value={stats!.confirmedBookings}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Cancelled"
                        value={stats!.cancelledBookings}
                        color="bg-red-500"
                    />
                    <StatCard
                        title="Revenue"
                        value={`₹${stats!.totalRevenue.toLocaleString()}`}
                        color="bg-purple-500"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    color,
}: {
    title: string;
    value: number | string;
    color: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
            <div className={`${color} h-2`} />
            <div className="p-6">
                <p className="text-gray-500 text-sm">{title}</p>
                <h2 className="text-3xl font-bold mt-3 text-gray-800">{value}</h2>
            </div>
        </div>
    );
}