import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { TaskType } from "src/app/app.config";
import { AppInjector, Task, TaskOperation } from "src/app/models";
import { FirebaseProviderService, LoaderService, NavService } from "src/app/providers";

@Component({
	selector: "app-base",
	templateUrl: "./base.component.html",
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent<T> {
	protected readonly ngUnsubscribe: Subject<T>;
	private readonly _FBProvider: FirebaseProviderService;
	private readonly _navCtrl: NavService;
	private readonly _loader: LoaderService;
	protected pageOrigin!: string;
	task!: T;
	// tslint:disable-next-line: no-any
	navParams: any | null;
	constructor() {
		this.ngUnsubscribe = new Subject<T>();
		const Injector = AppInjector.get;
		this._loader = Injector.get(LoaderService);
		this._FBProvider = Injector.get(FirebaseProviderService);
		this._navCtrl = Injector.get(NavService);
		this.navParams = (this._navCtrl.navParams && this._navCtrl.navParams.value) || null;
	}
	protected todoAdd(task: Task): Observable<TaskType> {
		return this._FBProvider.taskOperation(TaskOperation.ADD, task);
	}
	protected todoGet(task: Task): Observable<TaskType> {
		return this._FBProvider.taskOperation(TaskOperation.GET, task);
	}
	protected todoRemove(task: Task): Observable<TaskType> {
		return this._FBProvider.taskOperation(TaskOperation.REMOVE, task);
	}
	protected todoUpdate(task: Task): Observable<TaskType> {
		return this._FBProvider.taskOperation(TaskOperation.UPDATE, task);
	}
	protected getTaskList(task?: Task): Observable<TaskType> {
		return this._FBProvider.taskOperation(TaskOperation.LIST);
	}
	protected navPop(): Promise<void> {
		return this._navCtrl.navPop();
	}
	protected showLoader(): Promise<void> {
		return this._loader.showLoader();
	}
	protected hideLoader(): Promise<boolean> {
		return this._loader && this._loader.hideLoader();
	}
	// tslint:disable-next-line: no-any
	navigateForward(navigateTo: string, params: any = {}): Promise<any> {
		this.pageOrigin = navigateTo;
		return this._navCtrl.navigateForward(navigateTo, params);
	}
	navigateBack(_navigateTo?: string): Promise<boolean> {
		return this._navCtrl.navigateBack(this.pageOrigin || "home");
	}
	// tslint:disable-next-line: no-any
	navigateRoot(navigateTo: string, params: any = {}): Promise<boolean | void> {
		if (navigateTo) {
			this.pageOrigin = navigateTo;
		}
		this.navParams = params;
		return this._navCtrl.navigateRoot(navigateTo, params);
	}
	ionViewDidEnter(): void {
		this.initialize();
	}
	ionViewDidLeave(): void {
		this.cleanup();
	}
	initialize(): void {}
	cleanup(): void {
		this?.ngUnsubscribe?.next();
		this?.ngUnsubscribe?.complete();
	}
}
