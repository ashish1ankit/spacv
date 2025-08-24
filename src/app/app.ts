import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./feature/header/header";
import { Footer } from "./feature/footer/footer";
import { ToastMessage } from './shared/component/toast-message/toast-message';
import { Home } from './feature/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,ToastMessage,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('spacv');
}

