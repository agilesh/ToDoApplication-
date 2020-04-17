import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-to-dos/list-to-dos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id:number
  todo:Todo
  constructor(public todoDataService:TodoDataService,
 private route:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
        
       this.id = this.route.snapshot.params['id'];
       this.todo = new Todo(this.id,'',false,new Date());

       if(this.id!=-1)
       {
       this.todoDataService.retrieveTodo(`agilesh`,this.id)
       .subscribe
       (data => this.todo=data)
       }

  }
  saveTodo()
  {        


    if(this.id===-1)
    {
        //create todo
        this.todoDataService.createTodo('agilesh',this.todo)
      .subscribe(
        data => {
        console.log(data)
        this.router.navigate(['todos'])
      }
      )
    }
else
{

      this.todoDataService.updateTodo('agilesh',this.id,this.todo)
      .subscribe(
        data => {
        console.log(data)
        this.router.navigate(['todos'])
      }
      )

}
  }
}