import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceCard } from '../maintenance-card/maintenance-card';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceCard],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
})
export class MaintenanceList {
  private maintenanceService = inject(MaintenanceService);

  state = toSignal(withLoadState(this.maintenanceService.getMaintenance()), { requireSync: true });
}