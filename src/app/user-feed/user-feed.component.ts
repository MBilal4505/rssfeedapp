import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FeedEntry } from '../model/feed-entry';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute , Params } from '@angular/router';
import '../rxjs-operators';
@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
	id:String;
	feed:any;
/*private feedUrl: string = 'http://www.20min.ch/rss/rss.tmpl?type=channel&get=20&lang=ro';*/
  // if necessary, process the required link on this page:
  // https://rss2json.com and use the rss_url
  /*private feedUrl: string = 'http%3A%2F%2Fwww.20min.ch%2Frss%2Frss.tmpl%3Ftype%3Dchannel%26get%3D20%26lang%3Dro';*/
  private feedUrl: string = 'http://rss.cnn.com/rss/edition_asia.rss';
  /*private feedUrl: string = 'https://www.becompany.ch/en/blog/feed.xml';*/
  //private feedUrl: string = 'https://techcrunch.com/feed/';
  /*private feedUrl: string = 'http://www.rockclimbing.com/rss/routes/ascents/new.xml';*/
  private feeds: Array<FeedEntry> = [];
  constructor( private feedService: FeedService, private authService:AuthService,
  				private router: Router,
  				private route: ActivatedRoute,
  				 ) { }

  ngOnInit() {
  	 var item = this.refreshFeed();
  	 //Get user data
    this.authService.getUserFeed().subscribe(userfeed => {
  			this.feed = userfeed.feed;
  			// console.log('This user has the following data',this.feed);
  		},
  		err=> {
  			//console.log('This comes here',err);
  			return false;
  		});
  }
private refreshFeed() {
    this.feeds.length = 0;
    // Add 1s of delay to provide user feedback
    this.feedService.getFeedContent(this.feedUrl).delay(1000)
                    .subscribe(
                      feed => this.feeds = feed.items,
                      error => console.log(error)
                    );
  
  }
}
