import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule,FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  Todo(){
// this.searchNotesInput=document.getElementById(inputId);
// this.han
  }
  sortSlStatus=false;
  preDateStatus=false;
  sortDateStatus=false;
  isStrickThrough=false;
  searchNotesInput:any;
countSort=0;
countDateSort=0;
  toggelSortBySlNo(){
    if(this.countSort===0){
      this.sortSlStatus=false;
this.listData.sort((a,b)=>a.id-b.id);
this.countSort=1;
    }else{
      this.sortSlStatus=true;
      this.listData.sort((a,b)=>b.id-a.id);
this.countSort=0;
    }
  }

  toggelSortByDate(){
    console.log("methdohi: toggelSortByDate"+JSON.stringify(this.listData));
    this.preDateStatus=true;
    if(this.countDateSort===0){
      this.sortDateStatus=false;
this.listData.sort((a,b)=>new Date(a.ndate).getTime()-new Date(b.ndate).getTime());
this.countDateSort=1;
    }else{
      this.sortDateStatus=true;
      this.listData.sort((a,b)=>new Date(b.ndate).getTime()-new Date(a.ndate).getTime());
this.countDateSort=0;
    }
  }

  toggleStrciThroughNoteClass(id:Number){
    this.isStrickThrough=!this.isStrickThrough;
    
    for(let i=0;i<this.listData.length;i++){
      if(this.listData[i].id===id){
        // console.log("this.listData: "+JSON.stringify(this.listData[i]));
        this.listData[i].checked=this.isStrickThrough;
        break;
      }
    }
    // const ietm=this.listData.find(obj=>obj.id===id);
    // if(ietm){
    // ietm.checked=this.isStrickThrough;
    // }
  }
listData=[{
  id:1,
  name:'test',
  ndate: '2023/09/12'
  ,checked:false
},{
  id:2,
  name:'test captial',
  ndate: '2023/12/12'
  ,checked:true
}]
addListEntry(){
this.listData.push({id:this.listData.length+1,name:'New Task',ndate:(new Date()).toLocaleDateString(),checked:false});
}

// this.searchNotesInput=document.getElementById('searchNotes');
// this.searchNotesInput.addEventListener();

}
