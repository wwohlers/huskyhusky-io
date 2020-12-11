/**
 * Represents a Filter state for the Archive.
 */
export default interface ArchiveFilterInterface {
  dateRange: {
    lowerBound: number;
    upperBound: number;
  }
  tags: string[];
  author: string | null;
}
