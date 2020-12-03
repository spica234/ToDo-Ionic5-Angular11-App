import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Color } from "@ionic/core";
import { Observable } from "rxjs/internal/Observable";
import { map, tap } from "rxjs/operators";
import { TaskType } from "src/app/app.config";
import { BaseComponent } from "../components/base/base.component";
import { ISubTask, ITask, Override, stringParse, Task } from "../models";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends BaseComponent<TaskType> {
	todoList!: Observable<TaskType>;
	private _toDoList!: Array<ISubTask>;
	constructor(private _cd: ChangeDetectorRef) {
		super();
		this.showLoader();
		this._cd.detach();
	}
	@Override
	initialize(): void {
		this.todoList = this.getTaskList().pipe(
			map((res: any) => (this._toDoList = res)),
			tap(() => this.hideLoader())
		);
		this._cd.reattach();
		this._cd.detectChanges();
	}
	@Override
	cleanup(): void {
		super.cleanup();
	}
	navigateTo(navigateTo: string): Promise<void> {
		return this.navigateForward(navigateTo);
	}
	getColor(color: Color): string {
		return `var(--ion-color-${color})`;
	}
	addSubTask(task: Task): void {
		const { ids } = task as ITask;
		this.navigateForward("/add-sub-task", {ids, data:stringParse(task) });
	}
}
