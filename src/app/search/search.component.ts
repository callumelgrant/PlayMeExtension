import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {SearchService} from '../api';
import {ISearchResults} from '../models';

@Component({
	moduleId: module.id,
	selector: 'app-search',
	templateUrl: 'search.component.html',
	styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
	searchQuery: string;
	provider: string;
	results: ISearchResults = {};
	tracksTabActive: boolean = false;
	albumsTabActive: boolean = false;
	artistTabActive: boolean = false;
	constructor(private _route: ActivatedRoute,
		private _searchService: SearchService) {
	}

	ngOnInit() {
		this.searchQuery = this._route.snapshot.params['searchQuery'];
		this.provider = this._route.snapshot.params['provider'];

		this._searchService.search(this.provider, this.searchQuery).then(results => {
			this.results = results;
			if (results.PagedArtists.Artists.length) {
				this.artistTabActive = true;
			} else if (results.PagedAlbums.Albums.length) {
				this.albumsTabActive = true;
			} else {
				this.tracksTabActive = true;
			}
		});
	}
}