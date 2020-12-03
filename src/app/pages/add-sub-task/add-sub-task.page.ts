import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { IonInput } from "@ionic/angular";
import { BaseComponent } from "src/app/components/base/base.component";
import { ISubTask, ITask, Override, stringParse, SubTask } from "src/app/models";

@Component({
	selector: "app-add-sub-task",
	templateUrl: "./add-sub-task.page.html",
	styleUrls: ["./add-sub-task.page.scss"],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class AddSubTaskPage extends BaseComponent<ITask> {
	inputVal = "";
	subTask!: ISubTask;
	@ViewChild("inputRef", { read: IonInput }) private _inputRef: IonInput;
	constructor(private _cd: ChangeDetectorRef) {
		super();
	}
	@Override
	initialize(): void {
		const { ids, data } = this.navParams;
		const id = (data && data.id) || ids;
		const subTask = (data && data.subTask) || [];
		subTask.forEach((sub) => stringParse(sub));
		this.task = stringParse({ ...data, id, ids, subTask });
		this._cd.markForCheck();
	}
	popMe(): Promise<void> {
		return this.navPop();
	}
	addSubTask(): void {
		const newTask = new SubTask(this.inputVal.toString().trim());
		const { subTask } = this.task;
		if (subTask) {
			subTask.push(stringParse(newTask));
			this.task = { ...this.task, subTask };
		} else {
			const subTaskArr: Array<ISubTask> = [];
			subTaskArr.push(newTask);
			this.task = { ...this.task, subTask: stringParse(subTaskArr) };
		}
		this._cd.markForCheck();
		this._taskStatusUpdateCall(newTask);
	}
	@Override
	private async _taskStatusUpdateCall(subtask: ISubTask): Promise<void> {
		const noOfPendingTask: number =
			this.task?.subTask?.filter((subtaskCurrent: ISubTask) => !subtaskCurrent.isComp).length || 0;
		const noOfCompletedTask: number =
			this.task?.subTask?.filter((subtaskCurrent: ISubTask) => !!subtaskCurrent.isComp).length || 0;
		this.task = { ...this.task, pending: noOfPendingTask, completed: noOfCompletedTask };

		this._cd.markForCheck();
		this.todoUpdate(this.task).subscribe(
			(res) => {
				this._cd.detectChanges();
				this._inputRef.clearInput = true;
				this._inputRef.setFocus();
			},
			(err) => {
				this._cd.detectChanges();
				this._inputRef.clearInput = true;
				this._inputRef.setFocus();
			}
		);
	}
	@Override
	async taskStatusUpdate(subtask: ISubTask): Promise<void> {
		this.task.subTask
			.filter((subtaskCurrent: ISubTask) => subtaskCurrent.name.toLowerCase() === subtask.name.toLowerCase())
			.forEach((sub: ISubTask) => {
				sub.isComp = !subtask.isComp;
				this._cd.markForCheck();
			});
		this._cd.markForCheck();
		this._taskStatusUpdateCall(subtask);
	}
	getTextDecoration(val: ISubTask): string | null {
		return val.isComp ? "line-through" : null;
	}
}
