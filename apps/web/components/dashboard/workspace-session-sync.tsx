"use client";

import { useWorkspace } from "@/hooks/useWorkspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const WorkspaceSessionSync = () => {
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);
  const { data: workspace, isSuccess, isError, error } = useWorkspace();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSuccess && workspace) {
      setWorkspace({
        id: workspace.id,
        name: workspace.name,
        website: workspace.website,
      });
    }
  }, [isSuccess, setWorkspace, workspace]);

  useEffect(() => {
    if (isError) {
      clearWorkspace();
      // If it's a 403 (No subscription), maybe redirect to pricing, but for now we just want to ensure they have a workspace
      if (pathname !== "/create-workspace" && pathname !== "/pricing") {
        router.push("/create-workspace");
      }
    }
  }, [clearWorkspace, isError, router, pathname]);

  return null;
};
