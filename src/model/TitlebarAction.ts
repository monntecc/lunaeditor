export interface TitlebarAction {
    name: string;
    imageUrl: string;
    description: string;
    func: () => void;
}