/**
 * Represents a response from the API.
 * @param T the type of data that is returned by the request (assuming no error)
 */
export interface ApiResponse<T> {
  OK: boolean;
  data: T;
  error: number | null;
}
