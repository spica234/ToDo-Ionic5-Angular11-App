import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseComponent } from "src/app/components/base/base.component";
import { ITask, Task } from "src/app/models";
import { Color } from "src/app/models/color.enum";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.page.html",
	styleUrls: ["./add-task.page.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line: no-any
export class AddTaskPage extends BaseComponent<any> {
	readonly colorList: Array<Color> = [
		Color.PRIMARY,
		Color.SECONDARY,
		Color.TERTIARY,
		Color.SUCCESS,
		Color.WARNING,
		Color.DANGER,
		Color.DARK,
	];
	activeColor: Color = Color.SUCCESS;
	taskName = "";
	constructor() {
		super();
		this.hideLoader();
	}
	popMe(): Promise<void> {
		return this.navPop();
	}
	activeColorFn(colorName: Color): void {
		this.activeColor = colorName;
	}
	addTask(): void {
		this.showLoader();
		this.task = new Task(this.taskName, this.activeColor);
		// tslint:disable-next-line: no-any
		const subTask = [];
		const task: object = { ...this.task, subTask };
		this.todoAdd(task as ITask).subscribe(
			// tslint:disable-next-line: no-any
			(res: any) => {
				this.navPop();
				this.hideLoader();
				// tslint:disable-next-line: no-any
			},
			// tslint:disable-next-line: no-any
			(err: any) => {
				this.navPop();
				this.hideLoader();
			}
		);
	}
}
