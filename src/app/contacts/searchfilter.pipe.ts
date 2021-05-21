import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contact';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Contacts: Contact[], searchValue: string): Contact[] {

    if(!Contacts || !searchValue) {
      return Contacts;
    }

    return Contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      contact.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      contact.phone.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
