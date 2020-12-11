export const htmlUtils = {
  /**
   * Fixes up and sanitizes HTML so that it can be rendered as innerHTML.
   * @param rawHtml
   */
  renderHtml(rawHtml: string): string {
    // TODO: sanitize
    rawHtml = rawHtml.replaceAll("<p><br></p>", "");
    return rawHtml;
  }
}

export interface HtmlUtils {
  renderHtml: (rawHtml: string) => string;
}
