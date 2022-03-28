import {BehaviorSubject, Observable} from "rxjs";
import {Model} from "../model/model";
import {Project} from "../model/project/project";
import produce from "immer";

const initialState: Model = {
    projects: [],
}

class ProjectStore {
    private subject = new BehaviorSubject<Model>(initialState)

    set projects(projects: Project[]) {
        const newState = produce(this.subject.getValue(), draft => {
            draft.projects = projects;
        });

        this.subject.next(newState);
    }

    get model(): Observable<Model> {
        return this.subject;
    }
}

export default new ProjectStore()