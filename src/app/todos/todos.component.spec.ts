import { TodoService } from './../06-services/todos.service';
import { TodosComponent } from './todos.component';
import { from, empty, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    // Arrange
    const todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
        return from([ [1, 2, 3] ]);
    });

    // Act
    component.ngOnInit();

    // Assertion
    expect(component.todos).toEqual(todos);
  });

  it('should call a server to save changes when new todo item is added', () => {
    const spy = spyOn(service, 'add').and.callFake(t => {
      // tslint:disable-next-line: deprecation
      return empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  xit('should add new todo returned from the server', () => {
    const todo = {id: 1};
    const spy = spyOn(service, 'add').and.returnValue(from([ todo ]));

    component.add();
    console.log(component.todos);
    expect(component.todos.indexOf(todo)).toBeGreaterThan(0);
  });

  it('should set the message property if server returns an error when adding new todo', () => {
    const error = 'error from the server';
    spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();
    expect(component.message).toEqual(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    // tslint:disable-next-line: deprecation
    const spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    // tslint:disable-next-line: deprecation
    const spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });

});
