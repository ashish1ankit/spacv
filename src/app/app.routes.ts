import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Todo } from './feature/todo/todo';
import { Home } from './feature/home/home';
import { Login } from './feature/login/login';
import { Signup } from './feature/signup/signup';

export const routes: Routes = [{ path: '', component: Home }, { path: 'home', component: Home }, { path: 'todo', component: Todo }, { path: 'login', component: Login }, { path: 'signup', component: Signup }];
