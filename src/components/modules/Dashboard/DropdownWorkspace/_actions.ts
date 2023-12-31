"use server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import * as z from "zod";
import { ZodError } from "zod";
import { formSchema } from "./_schema";

type Inputs = z.infer<typeof formSchema>;

export const addWorkspace = async (data: Inputs) => {
  try {
    const session = await getServerAuthSession();
    const { name, type, description } = formSchema.parse(data);

    if (!session) return { error: "You must be logged in" };

    await db.workspace.create({
      data: {
        name,
        type,
        description,
        createdBy: { connect: { id: session.user.id } },
      },
    });
    return {
      status: "success",
      message: `Workspace added successfully name: ${name}`,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
};
