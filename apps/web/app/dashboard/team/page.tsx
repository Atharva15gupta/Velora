import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Collaboration",
  description: "Manage your team members and roles.",
};

const TeamPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
        <p className="text-muted-foreground">Manage your workspace members and their roles.</p>
      </div>
      <div className="border rounded-xl bg-card p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Team Members</h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Invite Member</button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          You are the only member in this workspace.
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
