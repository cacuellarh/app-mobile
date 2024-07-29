import { Inject } from '@angular/core';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { MAPPER, USE_CASE_GENERIC } from '../../../../../app/token';
import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../../../Aplication/Contracts/Map/IMap';
import { FireBaseResponse } from '../../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { CalculateTotalDelegate } from '../../../Delegates/CalculateTotalDelegate';
import { Subject, takeUntil } from 'rxjs';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';

export class LoadRecords<Entity extends BaseEntity> implements ICommand {
  private destroy$ = new Subject<void>();
    
  constructor(
    @Inject(USE_CASE_GENERIC)
    private UseCaseFacade: IUseCaseFacade<Entity>,
    @Inject(MAPPER)
    private mapper: IMapper<Entity>,
    private collection: Entity[],
    private calculateOperation: CalculateTotalDelegate
  ) {}

  async Execute(): Promise<void> {
    this.UseCaseFacade.GetAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: FireBaseResponse) => {
        if (Array.isArray(response.data)) {
          response.data.forEach((item) => {
            this.collection.push(this.mapper.MapTo(item as any));
          });
          this.calculateOperation();
        }
      },
      error: (err) => {
        console.error('Failed to load inventory box records:', err);
      },
    });
  }

  async Undo(): Promise<void> {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
