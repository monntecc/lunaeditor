import { CodeLang } from './CodeLang';

export interface CodeData {
  line: number;
  column: number;
  tabSize: number;
  lang: CodeLang;
  selectedChars?: number;
  selectedColumns?: number;
}
