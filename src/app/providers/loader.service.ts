import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { IonicSafeString, LoadingOptions } from "@ionic/core";

@Injectable({
	providedIn: "root",
})
export class LoaderService {
	_loaderInstance!: HTMLIonLoadingElement;

	constructor(private _loadingCtrl: LoadingController) {}

	async showLoader(): Promise<void> {
		const msg: string | IonicSafeString | undefined = "Please wait...";
		const options: LoadingOptions = {
			animated: true,
			backdropDismiss: false,
			keyboardClose: true,
			showBackdrop: true,
			translucent: true,
			duration: 5000,
			mode: "ios",
			message: msg,
		};
		this._loaderInstance = await this._loadingCtrl?.create(options);
		return this._loaderInstance?.present();
	}
	hideLoader(): Promise<boolean> {
		return this?._loaderInstance?.dismiss();
	}
}
