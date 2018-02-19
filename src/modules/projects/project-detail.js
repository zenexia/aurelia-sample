import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './../../gateway/web-api';
import {ItemUpdated,ItemViewed} from './../../common/messages';
import {areEqual} from './../../common/utility';

@inject(WebAPI, EventAggregator)
export class ProjectDetail {
    constructor(api, ea){
        this.api = api;
        this.ea = ea;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getProjectDetails(params.id).then(project => {
            this.project = project;
            this.routeConfig.navModel.setTitle(project.firstName);
            this.originalProject = JSON.parse(JSON.stringify(project));
            this.ea.publish(new ItemViewed(this.project));
        });
    }

    get canSave() {
        return this.project.firstName && this.project.lastName && !this.api.isRequesting;
    }

    save() {
        this.api.saveProject(this.project).then(project => {
            this.project = project;
            this.routeConfig.navModel.setTitle(project.firstName);
            this.originalProject = JSON.parse(JSON.stringify(project));
            this.ea.publish(new ItemUpdated(this.project));
        });
    }

    canDeactivate() {
        if(!areEqual(this.originalProject, this.project)){
            let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

            if(!result) {
                this.ea.publish(new ItemViewed(this.project));
            }

            return result;
        }

        return true;
    }
}