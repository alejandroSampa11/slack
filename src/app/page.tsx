"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login"; // Redirige a la página de login después de cerrar sesión
  };

  return (
    <div>
      Logged In!
      <Button onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
