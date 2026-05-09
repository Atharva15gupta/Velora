"use client";

import { useWorkspace, useCreateWorkspace } from "@/hooks/useWorkspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useEffect, useRef } from "react";

export const WorkspaceSessionSync = () => {
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);
  const { data: workspace, isSuccess, isError, error } = useWorkspace();
  const createWorkspaceMutation = useCreateWorkspace();
  const hasAttemptedCreation = useRef(false);

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
      const errorMessage = error?.message?.toLowerCase() || "";
      const isNotFound = errorMessage.includes("404") || errorMessage.includes("no workspace");
      
      if (isNotFound && !hasAttemptedCreation.current && !createWorkspaceMutation.isPending && !createWorkspaceMutation.isSuccess) {
        hasAttemptedCreation.current = true;
        createWorkspaceMutation.mutate({ name: "My Workspace", website: "" });
      }
    }
  }, [clearWorkspace, isError, error, createWorkspaceMutation.isPending, createWorkspaceMutation.isSuccess, createWorkspaceMutation.mutate]);

  return null;
};
