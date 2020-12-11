export const metaUtils = {
  setTitle(title: string) {
    document.title = `${title} | The Husky Husky`;
  },

  setDesc(desc: string) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
  }
}

export interface MetaUtils {
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
}
