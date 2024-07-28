import { Component } from '@angular/core';
import { InventoryBoxComponent } from './Components/inventory-box/inventory-box.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InventoryBoxComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
