import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{

  @ViewChild('todoTask') todoTask: any;

  task = '';
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.todoService.getTodoList().subscribe(
      response => {
        this.todoTask = response;
      }
    )
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo){
    this.todoService.updateTodo({ ...todo, completed: e.checked}
    ).subscribe(
      response => console.log(response)
    )
  }

  deleteTodo(e: unknown, id: Todo['id']){
    this.todoService.deleteTodo(id).subscribe(
      response => this.getList()
     
    )
  }

  addTodo() {
    this.todoService.addTodo({ task: this.task, completed: false }).subscribe(
      response => {
        this.todoTask.reset();
        this.getList();
      }
    )
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
