import { Component, OnInit } from '@angular/core';
import { TodoService } from '../06-services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  message;
  todos: any[];
  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t as any[]);
  }

  add() {
    const newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe();
    }
  }

}
