import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {SystemComponent} from "./system.component";
import {BillPageComponent} from "./bill-page/bill-page.component";
import {HistoryPageComponent} from "./history-page/history-page.component";
import {PlaningPageComponent} from "./planing-page/planing-page.component";
import {RecordsPageComponent} from "./records-page/records-page.component";
import {HistoryDetailComponent} from "./history-page/history-detail/history-detail.component";

const routes: Routes = [
    {path: '', component: SystemComponent, children : [
            {path: 'bill', component: BillPageComponent},
            {path: 'history', component: HistoryPageComponent},
            {path: 'planning', component: PlaningPageComponent},
            {path: 'records', component: RecordsPageComponent},
            {path: 'history/:id', component: HistoryDetailComponent}
        ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SystemRoutingModule { }
