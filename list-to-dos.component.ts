import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo
{
    constructor(
      public id:number,
      public description:string,
      public done:boolean,
      public targetDate:Date
    )
    {

    }
}


@Component({
  selector: 'app-list-to-dos',
  templateUrl: './list-to-dos.component.html',
  styleUrls: ['./list-to-dos.component.css']
})
export class ListToDosComponent implements OnInit {

todos : Todo[]
message:string;
// [
    
//   new Todo(1,'learn to code',false,new Date()),
//   new Todo(2,'become a full stack dev',false,new Date()),
//   new Todo(3,'hustle hard',false,new Date()),
//   new Todo(4,'start a business',false,new Date()),
//   new Todo(5,'become a trillionaire',false,new Date())
// ];

  constructor(private todoservice:TodoDataService,
    public router:Router) { }
   
  ngOnInit(): void {
    this.refreshTodos();
  }


refreshTodos()
{
  this.todoservice.retrieveAllTodos('agilesh').subscribe(
    response=>{
          console.log(response);
          this.todos=response;
    }
  )
}

  deleteTodo(id)
  {
    console.log(`delete to do${id}`);
    this.todoservice.deleteTodo('agilesh',id).subscribe(
      response=>{
            console.log(response);
            this.message = `delete of ${id} successful`;
            this.refreshTodos();
      }
    )
  }

  updateTodo(id)
  {
    console.log(`update ${id}`);
    this.router.navigate(['todos',id]);
  }



  addTodo()
  {
    this.router.navigate(['todos',-1]);
  }
}
