import projectStore from "../store/project-store";
import {Project} from "../model/project/project";

const urlParams = new URLSearchParams(window.location.search);
const apiUrl = urlParams.get("api-url");
const baseUrl = apiUrl ? `./${apiUrl}` : "./api";

export async function loadSchools() {
    const response = await fetch(`${baseUrl}/projects`);
    projectStore.projects = await response.json() as Project[];
}