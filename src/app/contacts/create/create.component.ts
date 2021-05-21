import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  modalRef: BsModalRef;
  @ViewChild('mymodal') modal: TemplateRef<any>;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    public contactService: ContactsService
  ){ }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]  
    })
  }

  submitForm() {
    this.contactService.getAll().subscribe((data: Contact[])=>{
      this.contacts = data;

      let alreadyexists = false;
      for (var index = 0; index < this.contacts.length; ++index) {
        var contact = this.contacts[index];

        if(contact.email == this.contactForm.value.email && 
          contact.phone == this.contactForm.value.phone){
          alreadyexists = true;
          break;
        }
      }

      if(alreadyexists == true) {
        this.openModal(this.modal);
      } else {
        this.contactService.create(this.contactForm.value).subscribe(res => {
          this.router.navigateByUrl('contacts/home')
        });
      }
    })  
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline() {
    this.modalRef.hide();
  }
}
