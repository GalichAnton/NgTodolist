import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CredentialsInterceptor } from '@core/interceptors/credentials-interceptor.service';

import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }],
})
export class CoreModule {}
