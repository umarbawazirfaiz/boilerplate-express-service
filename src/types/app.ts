export type Status = "success" | "failed" | "error";

export type MetaPagination = {
    total: number,
    limit: number
    current_page: number,
    total_pages: number
}

export type Response<T = unknown> = {
    status: Status;
    message: string;
    error?: unknown;
    data?: T | null;
}