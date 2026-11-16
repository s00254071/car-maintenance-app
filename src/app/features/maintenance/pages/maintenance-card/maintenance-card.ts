import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Maintenance } from '../../models/maintenance';

@Component({
  selector: 'app-maintenance-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './maintenance-card.html',
  styleUrl: './maintenance-card.scss',
})
export class MaintenanceCard {
  record = input.required<Maintenance>();
}