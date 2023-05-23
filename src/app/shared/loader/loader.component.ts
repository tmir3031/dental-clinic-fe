import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader-service';

@Component({
    selector: 'ado-core-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    loaderEnabled$: Observable<boolean>;

    constructor(public loaderService: LoaderService) {
        this.loaderEnabled$ = loaderService.loaderEnabled;
    }
}
