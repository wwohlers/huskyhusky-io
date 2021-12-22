export const metaUtils = {
  setTitle(title: string) {
    document.title = `${title} | The Husky Husky`;
  },

  setDesc(desc: string) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
  },

  setOgImage(uri: string) {
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", uri);
  }
}

export interface MetaUtils {
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setOgImage: (uri: string) => void;
}
