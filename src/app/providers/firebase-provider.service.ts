import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from "@angular/fire/firestore/collection/collection";
import { Observable } from "rxjs/internal/Observable";
import { defer } from "rxjs/internal/observable/defer";
import { from } from "rxjs/internal/observable/from";
import { map } from "rxjs/internal/operators/map";
import { ITask, stringParse } from "src/app/models";
import { TaskType } from "../app.config";
import { Task, TaskOperation } from "../models";
@Injectable({
	providedIn: "root",
})
export class FirebaseProviderService {
	private _taskList!: AngularFirestoreCollection<ITask>;
	// tslint:disable-next-line: no-any
	private readonly _tasks!: Observable<Array<ITask>>;

	constructor(private database: AngularFirestore) {
		this._taskList = this.database.collection<Task>("/todoTasks/");
		this._tasks = this._taskList.snapshotChanges().pipe(
			map((actions) => {
				return actions.map((a) => {
					const pdata = a.payload.doc.data();
					const ids = a.payload.doc.id;
					return JSON.parse(JSON.stringify({ ids, ...pdata }));
				});
			})
		);
	}

	taskOperation(_op: TaskOperation, _task?: ITask): Observable<TaskType> {
		const _taskStringified = stringParse(_task);
		switch (_op) {
			case TaskOperation.ADD:
				return this._taskAdd(_taskStringified);
				break;
			case TaskOperation.GET:
				return this._taskGet(_taskStringified);
				break;
			case TaskOperation.REMOVE:
				return this._taskRemove(_taskStringified);
				break;
			case TaskOperation.UPDATE:
				return this._taskUpdate(_taskStringified);
				break;
			case TaskOperation.LIST:
				return this._getTaskList();
				break;
			default:
				return new Observable(undefined);
				break;
		}
	}
	private _taskAdd(_task: ITask): Observable<DocumentReference> {
		const _taskStringified = stringParse(_task);
		const tempObj = stringParse(_taskStringified);
		const obj = Object.assign({}, tempObj);
		return defer(() => this._taskList.add({ ...obj }));
	}
	private _taskGet(_task: Task): Observable<ITask> {
		const _taskStringified = stringParse(_task);
		return this._taskList.doc(_taskStringified?.ids ?? _taskStringified?.id).valueChanges() as Observable<
			ITask
		>;
	}
	private _getTaskList(): Observable<Array<Task>> {
		return this._tasks;
	}
	private _taskRemove(_task: ITask): Observable<void> {
		const _taskStringified = stringParse(_task);
		return defer(() => this._taskList.doc(_taskStringified?.ids ?? _taskStringified?.id).delete());
	}
	// tslint:disable-next-line: typedef
	private _taskUpdate(_task: ITask): Observable<void> {
		const _taskStringified = stringParse(_task);
		const { ids, id, subTask } = _task;
		subTask.forEach((obj) => stringParse(obj));
		return from(this._taskList.doc<ITask>(id ?? ids).update({ ..._taskStringified, ids, id, subTask }));
	}
}
