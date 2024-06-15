import { ECodeLang, ECodeTheme } from '@/components/editor/models';
import { Extension } from '@codemirror/state';
import {
  amy,
  barf,
  bespin,
  birdsOfParadise,
  boysAndGirls,
  cobalt,
  dracula,
  tomorrow,
  clouds,
  ayuLight,
  smoothy,
  espresso,
  coolGlow,
  solarizedLight,
  noctisLilac,
  rosePineDawn
} from 'thememirror';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { rust } from '@codemirror/lang-rust';
import { vue } from '@codemirror/lang-vue';
import { javascript } from '@codemirror/lang-javascript';
import { sass } from '@codemirror/lang-sass';

export const editorThemes = () => {
  const themes: Map<ECodeTheme, Extension> = new Map();

  // Add themes
  themes.set(ECodeTheme.AMY, amy);
  themes.set(ECodeTheme.BOYS_AND_GIRLS, boysAndGirls);
  themes.set(ECodeTheme.BARF, barf);
  themes.set(ECodeTheme.BESPIN, bespin);
  themes.set(ECodeTheme.COBALT, cobalt);
  themes.set(ECodeTheme.BIRDS_OF_PARADISE, birdsOfParadise);
  themes.set(ECodeTheme.DRACULA, dracula);
  themes.set(ECodeTheme.TOMORROW, tomorrow);
  themes.set(ECodeTheme.CLOUDS, clouds);
  themes.set(ECodeTheme.AYU_LIGHT, ayuLight);
  themes.set(ECodeTheme.SMOOTHY, smoothy);
  themes.set(ECodeTheme.ESPRESSO, espresso);
  themes.set(ECodeTheme.COOL_GLOW, coolGlow);
  themes.set(ECodeTheme.SOLARIZED_LIGHT, solarizedLight);
  themes.set(ECodeTheme.NOCTIS_LILAC, noctisLilac);
  themes.set(ECodeTheme.ROSE_PINE_DAWN, rosePineDawn);

  return themes;
};

export const editorLangs = () => {
  const langs: Map<ECodeLang, Extension | null> = new Map();

  // Add langs
  langs.set(ECodeLang.PLAIN, null);
  langs.set(ECodeLang.HTML, html());
  langs.set(ECodeLang.JSON, json());
  langs.set(ECodeLang.RUST, rust());
  langs.set(ECodeLang.VUE, vue());
  langs.set(ECodeLang.JAVASCRIPT, javascript());
  langs.set(ECodeLang.SASS, sass());

  return langs;
};
