/**
 * **name**: Visible name in Settings Modal
 *
 * **id**: ID for JSON representation
 *
 * **type**: Type of a Variable
 *
 * Example:
 * ```ts
 * let a:ISettingOption = {
 *  name: "Font Size",
 *  id: "editor.fontSize",
 *  type: number
 * }
 * ```
 */

export interface ISettingOption {
  name: string;
  id: string;
  type: ESettingType;
}

enum ESettingType {
  boolean = 'BOOLEAN',
  string = 'STRING',
  number = 'NUMBER'
}
