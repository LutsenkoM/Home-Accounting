import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/user.service';
import {AuthService} from "./shared/services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {AuthGuard} from "./shared/services/auth.guard";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxChartsModule
    ],
    providers: [UserService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
