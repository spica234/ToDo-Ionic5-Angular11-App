import { ChangeDetectionStrategy, Component } from "@angular/core";
import { firebase } from "@firebase/app";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";
import { BaseAppConfig } from "./app.config";
@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	constructor(
		private _platform: Platform,
		private _splashScreen: SplashScreen,
		private _statusBar: StatusBar
	) {
		this.initializeApp();
	}

	private initializeApp(): void {
		this._initFirebase();
		this._platform.ready().then(() => {
			this._statusBar.styleDefault();
			this._splashScreen.hide();
		});
	}
	private _initFirebase(): void {
		firebase.initializeApp(BaseAppConfig.firebaseConfig);
	}
}
