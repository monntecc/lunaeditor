import { defineStore } from 'pinia';

import { ECodeLang, ECodeTheme } from '@/components/editor/models';
import { editorLangs, editorThemes } from '@/components/editor/data';
import { Extension } from '@codemirror/state';

export interface ICodeStoreState {
  theme: ECodeTheme;
  lang: ECodeLang;
}

export const useCodeStore = defineStore('code', {
  state: (): ICodeStoreState => {
    return {
      theme: ECodeTheme.BOYS_AND_GIRLS,
      lang: ECodeLang.PLAIN
    };
  },
  getters: {
    availableThemes(): ECodeTheme[] {
      const themes: ECodeTheme[] = [];
      for (const key of editorThemes().keys()) {
        themes.push(key);
      }
      return themes;
    },
    availableLangs(): ECodeLang[] {
      const langs: ECodeLang[] = [];
      for (const lang of editorLangs().keys()) {
        langs.push(lang);
      }
      return langs;
    },
    extensions(): Extension[] {
      const theme: Extension = editorThemes().get(this.theme)!;
      const lang: Extension | null = editorLangs().get(this.lang)!;
      if (lang) return [theme, lang];
      return [theme];
    }
  },
  actions: {
    setTheme(theme: ECodeTheme): void {
      this.theme = theme;
    },
    setLang(lang: ECodeLang): void {
      this.lang = lang;
    }
  }
});
