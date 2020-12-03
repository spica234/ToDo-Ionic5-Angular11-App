import { InjectionToken } from "@angular/core";
import { FirebaseOptions } from "@angular/fire";
import { DocumentReference } from "@angular/fire/firestore/interfaces";
import { ITask, Task } from "src/app/models";

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");
export type TaskType = Array<Task> | Task | DocumentReference | void | object | ITask;
export interface AppConfig {
	appName: string;
	appVersion: string;
	firebaseConfig: FirebaseOptions;
}
export const BaseAppConfig: AppConfig = {
   appName: "ToDo App",
   appVersion: "1.0.0",
   firebaseConfig: {
      apiKey: "<hidden for bravity>",
      authDomain: "todo-app-todo.firebaseapp.com",
      databaseURL: "https://todo-app-todo.firebaseio.com",
      projectId: "todo-app-todo",
      storageBucket: "todo-app-todo.appspot.com",
      messagingSenderId: "<hidden for bravity>",
      appId: "<hidden for bravity>",
      measurementId: "<hidden for bravity>",
   },
};
