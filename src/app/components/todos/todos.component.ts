import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { Todo } from '../../models/Todo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  loading: boolean;

  @ViewChild('confirmDialog') confirmDialog: TemplateRef<MatDialog>;
  private dialogRef: any;

  constructor(
    private service: TodoService,
    private auth: AuthService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.service.getTodos().subscribe((res: Todo[]) => {
      this.todos = res;
      this.loading = false;
    }, () => this.loading = false);
  }

  openDialog(item?: Todo, callback?: any): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: item,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (callback) {
        callback({...result});
      }
    });
  }

  openConfirm(item: Todo): void {
    this.dialogRef = this.dialog.open(this.confirmDialog, {
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeItem(item);
      }
    });
  }

  closeConfirm(result?: any): void {
    this.dialogRef.close(result);
    this.dialogRef = null;
  }

  removeItem(item: Todo): void {
    this.loading = true;
    this.service.removeTodo(item.id).subscribe((res) => {
      this.todos = this.todos.filter(i => i.id !== item.id);
      this.loading = false;
    }, () => this.loading = false);
  }

  logout(): void{
    this.auth.logout();
  }

  editItem(item?: Todo): void{
    this.openDialog(item, (data) => {
      if (data) {
        this.loading = true;
        const obs = data.id ? this.service.editTodo(data) : this.service.createTodo(data);
        obs.subscribe((res: Todo) => {
          this.loading = false;
          this.todos = data.id ? this.todos.map(i => (+i.id === +res.id ? res : i))
            : [{...data, ...res}, ...this.todos];
        }, () => this.loading = false);
      }
    });
  }
}
