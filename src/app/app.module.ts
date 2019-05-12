import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/user.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        SystemModule,
        AppRoutingModule,
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
