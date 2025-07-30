import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Todo } from './feature/todo/todo';
import { Home } from './feature/home/home';

export const routes: Routes = [{path: '',component: Home},{path: 'todo',component: Todo}];
