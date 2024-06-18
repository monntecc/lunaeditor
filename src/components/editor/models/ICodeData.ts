import { ECodeLang } from '@/components/editor/models';

export interface ICodeData {
  line: number;
  column: number;
  tabSize: number;
  lang: ECodeLang;
  selectedChars?: number;
  selectedColumns?: number;
}
