import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  modalRef: BsModalRef;
  contacts: Contact[] = [];
  searchValue: string;
  contactData: any;

  constructor(public contactService: ContactsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll() {
    this.contactService.getAll().subscribe((data: Contact[])=>{
      this.contacts = data;
    })  
  }

  delete(contactId) {
    this.contactService.delete(contactId).subscribe(data =>{
      this.getAll();
    });  
  }

  openModal(template: TemplateRef<any>, data) {
    this.contactData = data;
    this.modalRef = this.modalService.show(template, this.contactData);
  }

  confirm(data): void {
    this.delete(data.id);
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }
}
