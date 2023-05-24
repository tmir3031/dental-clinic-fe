import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private static _loaderEnabled = new BehaviorSubject<boolean>(false);

    get loaderEnabled() {
        return LoaderService._loaderEnabled;
    }

    public static showLoader() {
        console.log("aiii")
        LoaderService._loaderEnabled.next(true);
    }

    public static hideLoader() {
        LoaderService._loaderEnabled.next(false);
    }
}
