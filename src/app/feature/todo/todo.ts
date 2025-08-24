import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ToastMessage } from "../../shared/component/toast-message/toast-message";
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, ToastMessage],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  @ViewChild(ToastMessage) toast!: ToastMessage;
  //   ngOninit(userNotes: UserNotes){
  // this.getAllNotesData(userNotes);
  //   }
  Todo() {
    this.searchNotesInput = this.userNotesData;
  }
  constructor(private router:Router){}
  navigateHomeComp() {
    this.router.navigate(['/home']);
  }
  // constructor(private router: Router) { }
  actionTogleStatus = false;
  excelData:any;
  uploadedNoteExcels: Blob | null = null;
  uploadExcelStatus = false;
  isLogout=false;
  sortSlStatus = false;
  preDateStatus = false;
  sortDateStatus = false;
  isStrickThrough = false;
  searchNotesInput: any[] = [];
  uploadExcels: any[] = [];
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
  actionToggleStatus() {
    this.actionTogleStatus = !this.actionTogleStatus;
    // console.log(JSON.stringify(data.userNotesData));
    // this.userNotesData = data;
  }

  cancelPopUpload() { this.uploadExcelStatus = false; }
  cancelPopLogout() { this.isLogout = false; }
  toggleDownloadExcel() { this.actionTogleStatus = !this.actionTogleStatus;
    this.downloadNotesAsExcel() }
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
    this.mainData.push({ id: this.mainData.length + 1, name: 'New Task', ndate: (new Date()).toLocaleDateString(), checked: false });
    this.toast.show("Added new Notes Successfully!");
  }
addDataFromExcelEntry(note:string,ndate:Date,isChecked:boolean) {
    this.mainData.push({ id: this.mainData.length + 1, name: note, ndate: (new Date(ndate)).toLocaleDateString(), checked:isChecked });
    this.toast.show("Added new Notes Successfully!");
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
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.userNotesData = this.userNotesData.filter(row =>
        row.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    else {
      this.userNotesData = this.mainData;
    }
  }
  onTextChangeDates(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      console.log(" " + JSON.stringify(value));
      this.userNotesData = this.userNotesData.filter(row => {
        const itemDate = new Date(row.ndate);
        console.log(" " + JSON.stringify(itemDate));
        const dateVal = new Date(value);
        console.log(": " + JSON.stringify(dateVal));
        if (itemDate.getFullYear() === dateVal.getFullYear() ||
          itemDate.getMonth() === dateVal.getMonth() ||
          itemDate.getDate() === dateVal.getDate()) {
          return;
        };
      });
    }
    else {
      this.userNotesData = this.mainData;
    }
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
  toggleUploadExcel() {
    this.actionTogleStatus = !this.actionTogleStatus;
    this.uploadExcelStatus = !this.uploadExcelStatus;
  }
  toggleLogout() {
    this.isLogout = !this.isLogout;
  }

  onSelectNotesExcel(event: any) {
    const inputNotesExcel = event.target as HTMLInputElement;
    if (inputNotesExcel && inputNotesExcel.files) {
      for (let i = 0; i < inputNotesExcel.files.length; i++) {
        console.log("Uploaded file: " + inputNotesExcel.files[i].name);
        this.uploadExcels.push(inputNotesExcel.files[i].name);
      }
      this.uploadedNoteExcels = inputNotesExcel.files[0];
    }
  }
  successUpload() {
    if (this.uploadedNoteExcels && this.uploadedNoteExcels) {
this.processUploadedExcels();
      this.uploadExcelStatus = false;
    }
    else {
      this.toast.show("Please upload a single excel to continue!");
    }
  }
processUploadedExcels(){
  if(this.uploadedNoteExcels){
     const reader = new FileReader();

  reader.onload = (e: any) => {
    const arrayBuffer = e.target.result;

    // SheetJS can read ArrayBuffer - use type: 'array'
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const wsname = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[wsname];

    this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('Excel file contents:', this.excelData+typeof(this.excelData));
  };

  reader.readAsArrayBuffer(this.uploadedNoteExcels); // Use ArrayBuffer here!
  // for (let i = 0; i < this.excelData.size; i++) {
  //   // for(let j = 0; i < 3; i++)
  //   console.log('Excel file contents aaa:', this.excelData[i]);
  //   console.log('Excel file contents bb:', this.excelData[i][0]+' '+this.excelData[i][1]);
  //   this.addDataFromExcelEntry(this.excelData[i][0],this.excelData[1],true);};
  
  console.log("Uploading data in excel "+(this.uploadExcels)+" progress!");
  this.toast.show("Uploading data from excel "+(this.uploadExcels) +" in-progress!");
}

}
downloadNotesAsExcel(): void {
  this.toast.show("Download in progress!");
    const tableElement = document.getElementById('tab-notes');

    // Convert HTML table to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    // Create a new workbook and append the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate buffer
    const wbout: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save to file
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'notes'+new Date().toISOString()+'.xlsx');
  }

}
