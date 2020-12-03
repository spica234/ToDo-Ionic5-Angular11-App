import { Injector } from "@angular/core";
export class AppInjector {
	private static _Injector: Injector;
	static get get(): Injector {
		return this._Injector;
	}
	static set set(injector: Injector) {
		this._Injector = injector;
	}
}
