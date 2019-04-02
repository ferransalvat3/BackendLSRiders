import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserExt } from 'app/shared/model/user-ext.model';

@Component({
    selector: 'jhi-user-ext-detail',
    templateUrl: './user-ext-detail.component.html'
})
export class UserExtDetailComponent implements OnInit {
    userExt: IUserExt;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userExt }) => {
            this.userExt = userExt;
        });
    }

    previousState() {
        window.history.back();
    }
}
