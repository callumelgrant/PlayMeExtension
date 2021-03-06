import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';
import { HTTP_PROVIDERS } from '@angular/http';

import {
	SearchService,
	ArtistService,
	AlbumService,
	QueueService,
	AudioZoneService,
	UserInfoService,
	SignalRService
} from './api';

import { AlbumComponent } from './album';
import { SearchComponent } from './search';
import { ArtistComponent } from './artist';
import { QueueComponent } from './queue';
import { HistoryComponent } from './history';
import { NowPlayingComponent } from './now-playing';
import { PlayMeExtensionAppComponent } from './play-me-extension.component';
import { ArtistListItemComponent } from './search/artist-list-item';
import { AlbumListItemComponent } from './search/album-list-item'
import { ZoneSelectorComponent } from './now-playing';
import { SharedModule } from './shared';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		SharedModule
	],
	declarations: [
		PlayMeExtensionAppComponent,
		ZoneSelectorComponent,
		AlbumListItemComponent,
		ArtistListItemComponent,
		AlbumComponent,
		SearchComponent,
		ArtistComponent,
		QueueComponent,
		HistoryComponent,
		NowPlayingComponent,
	],
	providers: [
		appRoutingProviders,
		HTTP_PROVIDERS,
		SearchService,
		ArtistService,
		AlbumService,
		QueueService,
		AudioZoneService,
		UserInfoService,
		SignalRService
	],
	bootstrap: [PlayMeExtensionAppComponent]
})
export class AppModule { }
