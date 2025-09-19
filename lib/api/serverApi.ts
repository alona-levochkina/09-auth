import api from "./api";
import type { User } from "@/types/user";
import { Note } from "@/types/note";
import { FetchNotesParams, FetchNotesResponse } from "@/types/api";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

// --- User ---
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<User>("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const checkSession = (cookie: string): Promise<AxiosResponse> => {
  return api.get("auth/session", {
    headers: {
      Cookie: cookie,
    },
  });
};

// --- Notes (for Server Components) ---
export const fetchNotesOnServer = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteByIdOnServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
