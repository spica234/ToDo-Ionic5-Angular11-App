import { Injectable } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { NavigationOptions } from "@ionic/angular/providers/nav-controller";
import { BehaviorSubject } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class NavService {
	// tslint:disable-next-line: no-any
	readonly navParams: BehaviorSubject<NavParams | null | any>;
	constructor(private _navCtrl: NavController) {
		this.navParams = new BehaviorSubject(null);
	}
	// tslint:disable-next-line: no-any
	navigateForward(navigateTo: string, params: any = {}): Promise<boolean> {
		// tslint:disable-next-line: no-unused-expression
		params !== {} && this.navParams.next(params);
		const options: NavigationOptions = {
			animated: true,
			animationDirection: "forward",
			queryParams: params,
			replaceUrl: false,
			preserveQueryParams: true,
			queryParamsHandling: "merge",
			skipLocationChange: true,
		};
		params = { ...params, ...options };
		return this._navCtrl.navigateForward(navigateTo, params);
	}
	// tslint:disable-next-line: no-any
	navigateBack(navigateTo: string): Promise<any> {
		// tslint:disable-next-line: no-any
		const options: NavigationOptions = {
			animated: true,
			animationDirection: "back",
			replaceUrl: false,
			preserveQueryParams: true,
			queryParamsHandling: "merge",
			skipLocationChange: true,
		};
		return this._navCtrl.navigateBack(navigateTo, options);
	}
	// tslint:disable-next-line: no-any
	navigateRoot(navigateTo: string, params: any = {}): Promise<boolean> {
		// tslint:disable-next-line: no-unused-expression
		params !== {} && this.navParams.next(params);
		const options: NavigationOptions = {
			animated: true,
			replaceUrl: true,
			animationDirection: "forward",
			queryParams: params,
			preserveQueryParams: true,
			queryParamsHandling: "merge",
			skipLocationChange: true,
		};
		params = { ...params, ...options };
		return this._navCtrl.navigateRoot(navigateTo, params);
	}
	navPop(): Promise<void> {
		return this._navCtrl.pop();
	}
}
