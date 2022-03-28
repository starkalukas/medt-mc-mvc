import {Project} from "./project/project";

export interface Model {
    readonly projects: Project[];
    readonly currentProjectId?: number;
}