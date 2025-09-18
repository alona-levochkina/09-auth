import { CreateNoteData, Note } from "@/types/note";
import api from "./api";
import type { AuthRequestData, User } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse } from "@/types/api";


// --- User & Auth ---
export const signUp = (data: AuthRequestData) =>
  api.post("/auth/register", data);

export const signIn = (data: AuthRequestData) => api.post("/auth/login", data);
export const signOut = () => api.post("/auth/logout");
export const refreshSession = () => api.get<User>("/auth/session");
export const updateUser = (data: Partial<User>) =>
  api.patch<User>("/user/me", data);

// --- Notes (for Client Components) ---
export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const createNote = (noteData: CreateNoteData) =>
  api.post<Note>("/notes", noteData);
export const deleteNote = (noteId: string) =>
  api.delete<Note>(`/notes/${noteId}`);
