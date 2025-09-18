import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  return Promise.resolve([
    { id: "todo", name: "Todo" },
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
    { id: "meeting", name: "Meeting" },
    { id: "shopping", name: "Shopping" },
  ]);
};
