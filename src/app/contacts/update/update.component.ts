import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  contact: any = {};
  modalRef: BsModalRef;
  @ViewChild('mymodal') modal: TemplateRef<any>;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    public contactService: ContactsService
  ){ }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']  
    })

    this.getContactbyid();
  }

  getContactbyid(){
    this.route.params.subscribe(params => {
      this.contactService.getById([params['contactId']]).subscribe(res =>{
        this.contact = res;

        this.contactForm.patchValue({
          name: this.contact.name,
          email: this.contact.email,
          phone: this.contact.phone
        });
      });
    });
  }

  submitForm() {
    this.route.params.subscribe(params => {
      this.contactService.getAll().subscribe((data: Contact[])=>{
        this.contacts = data;

        let alreadyexists = false;
        for (var index = 0; index < this.contacts.length; ++index) {
          var contact = this.contacts[index];

          if(contact.id != params['contactId'] &&
            contact.email == this.contactForm.value.email && 
            contact.phone == this.contactForm.value.phone){
            alreadyexists = true;
            break;
          }
        }

        if(alreadyexists == true) {
          this.openModal(this.modal);

        } else {
          this.contactService.update([params['contactId']], this.contactForm.value).subscribe(res => {
            this.router.navigateByUrl('contacts/home')
          });
        }
      });  
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline() {
    this.modalRef.hide();
  }

}
