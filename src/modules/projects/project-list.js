import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './../../gateway/web-api';
import {ItemUpdated, ItemViewed} from './../../common/messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ProjectList {
    constructor(api, ea) {
        this.api = api;
        this.projects = [];

        ea.subscribe(ItemViewed, msg => this.select(msg.project));
        ea.subscribe(ItemUpdated, msg => {
            let id = msg.project.id;
            let found = this.projects.find(x => x.id == id);
            Object.assign(found, msg.project);
        });
    }

    created() {
        this.api.getProjectList().then(projects => this.projects = projects);
    }

    select(project) {
        console.log(project);
        this.selectedId = project.id;
        return true;
    }
}