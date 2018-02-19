import {inject} from 'aurelia-framework';
import {WebAPI} from './gateway/web-api';

@inject(WebAPI)
export class App {
    constructor(api) {
        this.api = api;
    }

    configureRouter(config, router) {
        config.title = 'Projects';
        config.options.pushState = true;
        config.map([

            {
                route: '/',
                moduleId: './modules/dashboard/home',
                title: 'Dashboard'
            },
            {
                route: '/projects',
                moduleId: './modules/projects/no-selection',
                title: 'projects'
            },
            {
                route: 'projects/:id',
                moduleId: './modules/projects/project-detail',
                name:'projects'
            }
        ]);

        this.router = router;
    }
}