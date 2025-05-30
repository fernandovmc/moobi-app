import { apiClient } from "./client";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  accountId: string;
  categoryId: string;
  tags: string[];
  notes?: string;
}

export interface CreateTransactionData {
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  accountId: string;
  categoryId: string;
  tags?: string[];
  notes?: string;
}

export const transactionsApi = {
  getAll: (params?: { page?: number; limit?: number; type?: string }) =>
    apiClient.get<{ data: Transaction[]; total: number }>("/transactions", {
      params,
    }),

  getById: (id: string) => apiClient.get<Transaction>(`/transactions/${id}`),

  create: (data: CreateTransactionData) =>
    apiClient.post<Transaction>("/transactions", data),

  update: (id: string, data: Partial<CreateTransactionData>) =>
    apiClient.put<Transaction>(`/transactions/${id}`, data),

  delete: (id: string) => apiClient.delete(`/transactions/${id}`),

  getStats: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get("/transactions/stats", { params }),
};
