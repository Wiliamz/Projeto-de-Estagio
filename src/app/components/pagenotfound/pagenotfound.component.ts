import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    BtnPrimaryComponent,
  ],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.scss'
})
export class PageNotFoundComponent {

}
