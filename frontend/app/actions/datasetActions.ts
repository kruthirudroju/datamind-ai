// D:\datamind-ai\frontend\app\actions\datasetActions.ts
"use server";

import { prisma } from "../../src/lib/db"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Fetch all datasets for the user
export async function getDatasets() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    return await (prisma.dataset as any).findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch datasets:", error);
    throw new Error("Database fetch failed");
  }
}

// Save dataset tracking metadata and parsed structure
export async function saveDatasetToDb(data: { 
  name: string; 
  size: any;
  rowCount?: number;
  columnCount?: number;
  columnNames?: string[];
  previewRows?: any;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    return await (prisma.dataset as any).create({
      data: {
        userId,
        filename: data.name,
        // If your frontend component doesn't parse these yet, these fallbacks 
        // will safely satisfy your schema constraints so it never crashes again:
        rowCount: data.rowCount ?? 0,
        columnCount: data.columnCount ?? 0,
        columnNames: data.columnNames ?? [],
        previewRows: data.previewRows ?? {}, 
      },
    });
  } catch (error: any) {
    console.error("Detailed Terminal Error:", error);
    throw new Error(error.message || "Failed to save dataset");
  } finally {
    revalidatePath("/dashboard/datasets");
  }
}

// Delete a dataset
export async function deleteDataset(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await (prisma.dataset as any).delete({
      where: { id, userId },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete dataset:", error);
    throw new Error("Database deletion failed");
  } finally {
    revalidatePath("/dashboard/datasets");
  }
}