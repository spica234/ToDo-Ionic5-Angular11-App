import { Color } from "src/app/models";

export class Task implements ITask {
	constructor(
		public name: string = "",
		public color: Color = Color.SUCCESS,
		public pending: number = 0,
		public completed: number = 0,
		public total: number = 0,
		public subTask: Array<ISubTask> = new Array<ISubTask>()
	) {}
}
export const stringParse = (obj: any) => {
	const newObj = Object.assign({}, obj);
	return newObj;
};
export interface ITask {
	name: string;
	color: Color;
	pending: number;
	completed: number;
	total: number;
	subTask: Array<ISubTask>;
	ids?: string;
	id?: string;
}
export class SubTask implements ISubTask {
	constructor(public name: string, public isComp: boolean = false) {}
}
export type ISubTask = { name: string; isComp: boolean };
export enum TaskOperation {
	"ADD",
	"GET",
	"REMOVE",
	"UPDATE",
	"LIST",
}
