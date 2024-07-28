import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IBaseRepository } from '../Aplication/Contracts/Repository/IBaseRepository';
import { DI_CREDIT_REPOSITORY, DI_INVENTORY_BOX_REPOSITORY, DI_INVENTORY_UNIT_REPOSITORY, DI_PROVIDER_REPOSITORY, DI_REPOSITORY_FACTORY, USE_CASE_GENERIC, FACTORY_REPOSITORIES, GET_DATE_USE_CASE, USE_CASE_CREATE_BASE_ENTITY, USE_CASE_GET_ENTITY,} from './token';
import { IMapper } from '../Aplication/Contracts/Map/IMap';
import { CollectionData } from '../Domain/Commons/Models/CollectionData';
import { MapperRequest } from '../Domain/Commons/Request/Repository/MapperRequest';
import { IUseCase } from '../Domain/Commons/UseCase/IUseCase';
import { FireBaseResponse } from '../Domain/Commons/Response/Repository/FireBaseResponse';
import { GetInventoryBoxUseCase } from '../Aplication/UseCase/InventoryBox/GetInventoryBoxUseCase';
import { IInventoryBoxRepository } from '../Aplication/Contracts/Repository/IInventoryBoxRepository';
import { InventoryBoxRepository } from '../Infraestructure/Persistence/Repositories/InventoryBoxRepository';
import { GetInventoryUnitUseCase } from '../Aplication/UseCase/InventoryUnit/GetInventoryUnitUseCase';
import { InventoryUnitRepository } from '../Infraestructure/Persistence/Repositories/InventoryUnitRepository';
import { CreditRepository } from '../Infraestructure/Persistence/Repositories/CreditRepository';
import { GetCreditUseCase } from '../Aplication/UseCase/Credit/GetCreditUseCase';
import { ProviderRepository } from '../Infraestructure/Persistence/Repositories/ProviderRepository';
import { GetProviderUseCase } from '../Aplication/UseCase/Provider/GetProviderUseCase';
import { CreateInventoryBoxUseCase } from '../Aplication/UseCase/InventoryBox/CreateInventoryBoxUseCase';
import { InventoryBox } from '../Domain/Entities/InventoryBox';
import { CreateInventoryUnitUseCase } from '../Aplication/UseCase/InventoryUnit/CreateInventoryUnitUseCase';
import { InventoryUnit } from '../Domain/Entities/InventoryUnit';
import { RepositoryFactory } from '../Aplication/FactoryImp/Repository/RepositoryFactory';
import { RepositoryName } from '../Domain/Commons/EnumData/RepositoryName';
import { IRepositoryFactory } from '../Aplication/Contracts/Factory/IRepositoryFactory';
import { InventoryBoxUseCaseFacade } from '../Aplication/UseCase/InventoryBox/Facade/InventoryBoxUseCaseFacade';
import { ProviderUseCaseFacade } from '../Aplication/UseCase/Provider/facade/ProviderUseCaseFacade';
import { DateFormat } from '../Aplication/Utils/DateFormat';
import { GetInventoryBoxByDateUseCase } from '../Aplication/UseCase/InventoryBox/GetInventoryBoxByDateUseCase';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: DI_INVENTORY_BOX_REPOSITORY, useClass: InventoryUnitRepository },
    { provide: DI_REPOSITORY_FACTORY, useClass: RepositoryFactory},
    { provide: USE_CASE_GENERIC, useClass: InventoryBoxUseCaseFacade},
    {provide: FACTORY_REPOSITORIES, useClass: RepositoryFactory},
    {provide: GET_DATE_USE_CASE, useClass: GetInventoryBoxByDateUseCase}
  ]
})
export class AppComponent {
  title = 'fruver';

  constructor(

    //@Inject(USE_CASE_GET_ENTITY) private useCase: IUseCase<void,FireBaseResponse>,
    private fac : RepositoryFactory,
    @Inject(USE_CASE_GENERIC) private facade: InventoryBoxUseCaseFacade,
    @Inject(GET_DATE_USE_CASE) private date: IUseCase<string, FireBaseResponse>,
    
  ) {}

  async ngOnInit() {

   //console.log(await this.date.Execute("2024-07-22"))
    // let inv : InventoryBox = {BoxValue:500, Cuantity:5,Date:DateFormat.getDate(),Product:"prueba fecha string"}
    // console.log(await this.facade.Create(inv))
  }
}
//   try {
//     const response = await this.productRepository.GetAllAsync();
//     console.log(response)
//     if (response.data && Array.isArray(response.data)) {
//       response.data.forEach((product: CollectionData) => {
//         const request: MapperRequest = new MapperRequest(product.id, product.data);
//         this.products.push(this.productMapper.MapFrom(request));
//       });
//     } else {
//       console.error('Data format is not as expected');
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// }
  //   console.log(this.products);
  // } catch (error) {
    //   console.error('Error fetching products:', error);
    // }
    
// var p : Product = {DeleteSoft:true,Name:"prueba creacion",CreateAt: new Date(), UpdateAt: new Date()}
// var res = await this.baseRepository.CreateAsync("Product",p)
// console.log(res)

// var p : Product = {DeleteSoft:true,Name:"prueba edicion",CreateAt: new Date(), UpdateAt: new Date()}
// var update = this.baseRepository.UpdateAsync("Product","659trn3zq11sap9RMSnz",p)

// var get = await this.baseRepository.GetRecordAsync("Product", "659trn3zq11sap9RMSnz")
// console.log(get.data)

// var deletep = await this.baseRepository.DeleteRecordAsync("Product", "659trn3zq11sap9RMSnz")
// console.log(deletep)