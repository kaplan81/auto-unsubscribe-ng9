import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'destroyed',
    loadChildren: () => import('../destroyed/destroyed.module').then(m => m.DestroyedModule),
  },
  {
    path: 'boilerplate',
    loadChildren: () => import('../boilerplate/boilerplate.module').then(m => m.BoilerplateModule),
  },
  {
    path: 'abstract',
    loadChildren: () => import('../abstract/abstract.module').then(m => m.AbstractModule),
  },
  { path: 'mixin', loadChildren: () => import('../mixin/mixin.module').then(m => m.MixinModule) },
  {
    path: 'decorator',
    loadChildren: () => import('../decorator/decorator.module').then(m => m.DecoratorModule),
  },
  {
    path: '**',
    redirectTo: 'boilerplate',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
