import { db } from "@/server/db";
import {
  WorkspaceGetCountType,
  WorkspaceCreateType,
  WorkspaceMemberType,
} from "./workspace.type";

export const getWorkspace = async (id: number) => {
  return await db.workspace.findUnique({
    where: { id },
  });
};

export const getWorkspaceCount = async ({
  createdById,
  name,
}: WorkspaceGetCountType) => {
  return await db.workspace.count({
    where: { createdById: createdById, name },
  });
};

export const createWorkspace = async (data: WorkspaceCreateType) => {
  return await db.workspace.create({ data });
};

export const deleteWorkspace = async (slug: string) => {
  return await db.workspace.deleteMany({ where: { slug } });
};

export const createWorkspaceMember = async (data: WorkspaceMemberType) => {
  return await db.workspaceMember.create({ data });
};

export const deleteWorkspaceMember = async (id: number) => {
  return await db.workspaceMember.deleteMany({ where: { workspaceId: id } });
};
