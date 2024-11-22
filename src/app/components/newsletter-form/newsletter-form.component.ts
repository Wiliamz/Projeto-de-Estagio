import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newsletterForm !: FormGroup;


  constructor(private fb: FormBuilder, private userService: NewsletterService) {
    this.newsletterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  async onSubmit() {
    const { name, email } = this.newsletterForm.value;
    try {
      await this.userService.addUser(name, email);
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      if (error === 'E-mail já cadastrado.') {
        alert('Este e-mail já está cadastrado.');
      } else {
       //  console.error('Erro ao adicionar usuário:', error);
      }
    }
  }
}