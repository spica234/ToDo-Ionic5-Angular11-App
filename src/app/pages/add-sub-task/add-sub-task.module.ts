import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AddSubTaskPageRoutingModule } from "./add-sub-task-routing.module";
import { AddSubTaskPage } from "./add-sub-task.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AddSubTaskPageRoutingModule],
	declarations: [AddSubTaskPage],
})
export class AddSubTaskPageModule {}
