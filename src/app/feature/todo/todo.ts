import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  //   ngOninit(userNotes: UserNotes){
  // this.getAllNotesData(userNotes);
  //   }
  Todo() {
    this.searchNotesInput = this.userNotesData;
  }

  sortSlStatus = false;
  preDateStatus = false;
  sortDateStatus = false;
  isStrickThrough = false;
  searchNotesInput: any[] = [];
  // userNotesData:any=[];
  mainData = [{
    id: 1,
    name: 'test',
    ndate: '2023/09/12'
    , checked: false
  }, {
    id: 2,
    name: 'test captial',
    ndate: '2023/12/12'
    , checked: true
  }];
  //    ngOninit(){
  // this.userNotesData=this.mainData;
  //   }
  userNotesData = this.mainData;
  searchNote = new Subject<string>();
  countSort = 0;
  countDateSort = 0;
  getAllNotesData(data: any) {
    console.log(JSON.stringify(data.userNotesData));
    this.userNotesData = data;
  }
  toggelSortBySlNo() {
    if (this.countSort === 0) {
      this.sortSlStatus = false;
      this.userNotesData.sort((a, b) => a.id - b.id);
      this.countSort = 1;
    } else {
      this.sortSlStatus = true;
      this.userNotesData.sort((a, b) => b.id - a.id);
      this.countSort = 0;
    }
  }

  toggelSortByDate() {
    // console.log("methdohi: toggelSortByDate"+JSON.stringify(this.listData));
    this.preDateStatus = true;
    if (this.countDateSort === 0) {
      this.sortDateStatus = false;
      this.userNotesData.sort((a, b) => new Date(a.ndate).getTime() - new Date(b.ndate).getTime());
      this.countDateSort = 1;
    } else {
      this.sortDateStatus = true;
      this.userNotesData.sort((a, b) => new Date(b.ndate).getTime() - new Date(a.ndate).getTime());
      this.countDateSort = 0;
    }
  }

  toggleStrciThroughNoteClass(id: Number) {
    this.isStrickThrough = !this.isStrickThrough;

    for (let i = 0; i < this.userNotesData.length; i++) {
      if (this.userNotesData[i].id === id) {
        // console.log("this.listData: "+JSON.stringify(this.listData[i]));
        this.userNotesData[i].checked = this.isStrickThrough;
        break;
      }
    }
    // const ietm=this.listData.find(obj=>obj.id===id);
    // if(ietm){
    // ietm.checked=this.isStrickThrough;
    // }
  }

  addListEntry() {
    this.mainData.push({ id: this.userNotesData.length + 1, name: 'New Task', ndate: (new Date()).toLocaleDateString(), checked: false });
  }

  // this.searchNotesInput=document.getElementById('searchNotes');
  // this.searchNotesInput.addEventListener();
  // results: userNotesData | null=null;
  escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // const pattern = searchTerms.map(term => `\\b${escapeRegExp(term)}\\b`).join("|");
  // const regex = new RegExp(pattern, "i");
  searchRequestSubsubscription: Subscription[] = [];
  onTextChangeNotes(event: Event) {
    // this.cancelPendingRequests();
    var searchedData = [];
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.userNotesData = this.userNotesData.filter(row =>
        row.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    else {
      this.userNotesData = this.mainData;
    }

    // const matches = this.searchWithList(value);
    // for(){const matches = sentence.match(regexGlobal);}

    // console.log(JSON.stringify(this.userNotesData));
    // this.searchRequestSubsubscription.push(searchedData);
  }
  searchByNotes(note: string) {
    this.isStrickThrough = !this.isStrickThrough;
    var notesS = [];
    for (let i = 0; i < this.userNotesData.length; i++) {
      if (this.userNotesData[i].name.toLowerCase().includes(note)) {
        // console.log("this.listData: "+JSON.stringify(this.listData[i]));
        // this.userNotesData[i].checked=this.isStrickThrough;
        // break;
        notesS.push(this.userNotesData[i]);
      }
    }
    return notesS;
  }
}
