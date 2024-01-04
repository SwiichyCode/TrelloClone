import type { WorkspaceRole } from "@/types";

export type WorkspaceGetCountType = {
  createdById: string;
  name: string;
};

export type WorkspaceCreateType = {
  name: string;
  type: string;
  description?: string;
  logo: string;
  slug: string;
  createdBy: { connect: { id: string } };
};

export type WorkspaceMemberType = {
  workspaceId: number;
  userId: string;
  role: WorkspaceRole;
};
