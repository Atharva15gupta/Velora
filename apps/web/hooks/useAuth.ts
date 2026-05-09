"use client";

import {
  fetchCurrentUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  registerUser,
  updateUser,
} from "@/lib/api/auth";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useClerk, useUser } from "@clerk/nextjs";

export function useSession() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    retry: false,
    gcTime: 5 * 60 * 1000,
  });
}

export const useSignupUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      clearWorkspace();
      queryClient.removeQueries({ queryKey: ["workspace"] });
      setUser({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      queryClient.setQueryData(["user"], user);
      router.push("/onboarding");
    },
    onError: (error) => {
      toast.error(
        `Registration error: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      clearWorkspace();
      queryClient.removeQueries({ queryKey: ["workspace"] });
      setUser({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      queryClient.setQueryData(["user"], user);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        `Login error: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });
}

export const useGoogleLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);

  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (user) => {
      clearWorkspace();
      queryClient.removeQueries({ queryKey: ["workspace"] });
      setUser({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      queryClient.setQueryData(["user"], user);
      router.push("/dashboard"); // Or onboarding if new user, but google login doesn't differentiate here unless backend tells us. For now, redirect to dashboard, dashboard will check onboarding status.
    },
    onError: (error) => {
      toast.error(
        `Google Login error: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });
}

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useUserStore((s) => s.clearUser);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);
  const { signOut } = useClerk();

  return useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      clearUser();
      clearWorkspace();
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["workspace"] });
      router.push("/sign-in");
    },
    onError: (error) => {
      toast.error(
        `Logout error: ${error instanceof Error ? error.message : String(error)}`
      );
      clearUser();
      clearWorkspace();
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["workspace"] });
      router.push("/sign-in");
    },
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);
  const { user: clerkUser } = useUser();

  return useMutation({
    mutationFn: async (payload: { firstName: string; lastName: string; email?: string }) => {
      // First update Clerk, as it's the source of truth
      if (clerkUser) {
        await clerkUser.update({
          firstName: payload.firstName,
          lastName: payload.lastName,
        });
        
        // Return optimistic data since webhook will update the backend
        return {
          id: clerkUser.id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email || clerkUser.primaryEmailAddress?.emailAddress || "",
        };
      }
      
      // Fallback if Clerk isn't initialized (shouldn't happen)
      return updateUser(payload);
    },
    onSuccess: (user) => {
      if (user) {
        setUser({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
        queryClient.setQueryData(["user"], user);
      }
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
};
