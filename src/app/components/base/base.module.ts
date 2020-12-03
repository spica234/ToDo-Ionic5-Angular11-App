import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseComponent } from "./base.component";
@NgModule({
	imports: [CommonModule, FormsModule, IonicModule],
	declarations: [BaseComponent],
	exports: [BaseComponent],
})
export class BaseComponentModule {}
