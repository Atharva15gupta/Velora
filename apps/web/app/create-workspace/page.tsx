import { CreateWorkspaceView } from "@/views/auth/create-workspace-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Workspace",
  description: "Create your new workspace in Velora.",
};

const CreateWorkspace = () => {
  return <CreateWorkspaceView />;
};

export default CreateWorkspace;
