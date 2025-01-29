import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperAgentBadgeComponent } from './super-agent/super-agent-badge/super-agent-badge.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SuperAgentBadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'serenity-agent';
}
