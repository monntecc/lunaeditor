import { DropdownMenuChildren } from "@/model/DropdownMenuChildren.ts";

export interface DropdownMenuParent {
    span: string;
    children: DropdownMenuChildren[];
}