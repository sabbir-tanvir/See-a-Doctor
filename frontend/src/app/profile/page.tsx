"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);
  
  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.displayName) return "U";
    
    const nameParts = user.displayName.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };
  
  // Show loading state or redirect if not authenticated
  if (loading || !user) {
    return <div className="container py-12 text-center">Loading...</div>;
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader className="flex items-center">
            <Avatar className="h-24 w-24 mb-4">
              {user.photoURL && (
                <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
              )}
              <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.displayName || "User"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
        </Card>
        
        {/* Account Details */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium text-sm text-muted-foreground">Full Name</div>
              <div>{user.displayName || "Not provided"}</div>
            </div>
            
            <div>
              <div className="font-medium text-sm text-muted-foreground">Email Address</div>
              <div>{user.email}</div>
            </div>
            
            {user.metadata && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Account Created</div>
                <div>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
