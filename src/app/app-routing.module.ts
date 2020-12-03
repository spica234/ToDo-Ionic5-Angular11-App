import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () => import("./home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "add-task",
		loadChildren: () => import("./pages/add-task/add-task.module").then((m) => m.AddTaskPageModule),
	},
	{
		path: "add-sub-task",
		loadChildren: () =>
			import("./pages/add-sub-task/add-sub-task.module").then((m) => m.AddSubTaskPageModule),
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
