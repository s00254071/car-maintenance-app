import { Component, OnInit, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateMaintenanceDto } from '../../models/maintenance';
import { MaintenanceService } from '../../services/maintenance.service';
import { CarService } from '../../../cars/services/car.service';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-maintenance-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  templateUrl: './maintenance-form.html',
  styleUrl: './maintenance-form.scss',
})
export class MaintenanceForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private maintenanceService = inject(MaintenanceService);
  private carService = inject(CarService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly id = input<string>();

  readonly types = ['oil change', 'tyres', 'nct', 'brakes', 'repair'];

  cars = toSignal(withLoadState(this.carService.getCars()), { requireSync: true });

  saving = signal(false);
  saveError = signal<string | null>(null);

  maintenanceForm = this.formBuilder.nonNullable.group({
    carId: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    cost: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    const id = this.id();
    if (!id) return; // adding a new record, nothing to load

    this.maintenanceService.getMaintenanceById(id).subscribe({
      next: (record) =>
        this.maintenanceForm.patchValue({
          carId: record.carId,
          type: record.type,
          date: record.date.slice(0, 10),
          cost: record.cost
        }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

  onSubmit(): void {
    if (this.maintenanceForm.invalid) return;

    const { carId, type, date, cost } = this.maintenanceForm.getRawValue();
    const newRecord: CreateMaintenanceDto = { carId, type, date, cost: cost ?? 0 };

    this.saving.set(true);
    this.saveError.set(null);
    this.maintenanceForm.disable();

    const id = this.id();
    const request = id
      ? this.maintenanceService.updateMaintenance(id, newRecord)
      : this.maintenanceService.addMaintenance(newRecord);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newRecord.type} saved`, 'Close', { duration: 10000 });
        console.log('Maintenance saved successfully:', response);
        this.router.navigate(['/maintenance']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.maintenanceForm.enable();
      },
    });
  }
}