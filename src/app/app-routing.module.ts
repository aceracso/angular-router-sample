import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selecting-preloading-strategy.service';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crises.module').then(m => m.CrisesModule),
    data: {preload: true}
  },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },

  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        preloadingStrategy: SelectivePreloadingStrategyService
      } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategyService
  ]
})
export class AppRoutingModule { }
