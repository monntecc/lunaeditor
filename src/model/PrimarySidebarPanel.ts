import { VNode } from "vue";

export interface PrimarySidebarPanel {
    name: string;
    title: string;
    component: () => VNode;
    iconComponent: () => VNode;
}