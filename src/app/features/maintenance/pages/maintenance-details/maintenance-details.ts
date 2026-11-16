import { Component, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { switchMap } from 'rxjs';
import { Maintenance } from '../../models/maintenance';
import { MaintenanceService } from '../../services/maintenance.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-maintenance-details',
  imports: [RouterLink, MatButtonModule, DatePipe],
  templateUrl: './maintenance-details.html',
  styleUrl: './maintenance-details.scss',
})
export class MaintenanceDetails {
  private maintenanceService = inject(MaintenanceService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  readonly initial: LoadState<Maintenance> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.maintenanceService.getMaintenanceById(id))),
    ),
    { initialValue: this.initial },
  );

  readonly deleting = signal(false);

  readonly deleteError = signal<string | null>(null);

  deleteMaintenance(record: Maintenance): void {
    if (!confirm(`Delete ${record.type} record?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.maintenanceService.deleteMaintenance(record._id).subscribe({
      next: () => this.router.navigate(['/maintenance']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}