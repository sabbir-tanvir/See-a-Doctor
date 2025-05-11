"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { authAPI } from "@/lib/api";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await authAPI.getProfile();
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load profile");
        if (err.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);
  
  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to logout");
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="container py-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4">Loading profile...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container py-12 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.push("/login")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }
  
  // Show profile if user is loaded
  if (!user) {
    return null;
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader className="flex items-center">
            <Avatar className="h-24 w-24 mb-4">
              {user.img && (
                <AvatarImage src={user.img} alt={user.name} />
              )}
              <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
        
        {/* Account Details */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium text-sm text-muted-foreground">Full Name</div>
              <div>{user.name}</div>
            </div>
            
            <div>
              <div className="font-medium text-sm text-muted-foreground">Email Address</div>
              <div>{user.email}</div>
            </div>

            {user.phone && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Phone Number</div>
                <div>{user.phone}</div>
              </div>
            )}

            {user.address && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Address</div>
                <div>{user.address}</div>
              </div>
            )}

            {user.dateOfBirth && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Date of Birth</div>
                <div>{new Date(user.dateOfBirth).toLocaleDateString()}</div>
              </div>
            )}

            {user.gender && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Gender</div>
                <div className="capitalize">{user.gender}</div>
              </div>
            )}

            {user.bloodGroup && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Blood Group</div>
                <div>{user.bloodGroup}</div>
              </div>
            )}
            
            <div>
              <div className="font-medium text-sm text-muted-foreground">Account Created</div>
              <div>{new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
