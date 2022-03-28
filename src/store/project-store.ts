import {BehaviorSubject, Observable} from "rxjs";
import {Model} from "../model/model";
import {Project} from "../model/project/project";
import produce from "immer";

const initialState: Model = {
    projects: [],
    currentProjectId: null
}

class ProjectStore {
    private subject = new BehaviorSubject<Model>(initialState)

    set projects(projects: Project[]) {
        this.next(produce(this.state, model => {
            model.projects = projects.reduce((array, projects) => {
                    array[projects.id] = projects
                    return array
                },
                []);
        }));
    }

    set project(project: Project) {
        this.next(produce(this.state, model => {
            model.projects[project.id] = project
        }))
    }
    set currentProjectId(id: number) {
        this.next(produce(this.state, model => {
            model.currentProjectId = id
        }));
    }
    set state(_notAllowed: Model) {
        throw new Error("state is read only");
    }
    get state() {
        return this.subject.getValue();
    }
    get model(): Observable<Model> {
        return this.subject;
    }

    private next(state: Model) {
        this.subject.next(state);
    }
}

export default new ProjectStore()