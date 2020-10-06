import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../models/Todo';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      title: '',
      id: '',
      userId: '',
      completed: ''
    });
    if (data) {
      this.todoForm.patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(this.todoForm.valid ? this.todoForm.value : null);
  }

  closeModal(): void{
    this.dialogRef.close();
  }
}
