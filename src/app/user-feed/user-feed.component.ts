import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FeedEntry } from '../model/feed-entry';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import '../rxjs-operators';
@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
	id:String;
	feed:any;
  url:any[];
  rss:any;
/*private feedUrl: string = 'http://www.20min.ch/rss/rss.tmpl?type=channel&get=20&lang=ro';*/
  // if necessary, process the required link on this page:
  // https://rss2json.com and use the rss_url
  /*private feedUrl: string = 'http%3A%2F%2Fwww.20min.ch%2Frss%2Frss.tmpl%3Ftype%3Dchannel%26get%3D20%26lang%3Dro';*/
  
  /*private feedUrl: string = 'https://www.becompany.ch/en/blog/feed.xml';*/
  //private feedUrl: string = 'https://techcrunch.com/feed/';
  /*private feedUrl: string = 'http://www.rockclimbing.com/rss/routes/ascents/new.xml';*/
  private feeds: Array<FeedEntry> = [];
  private feedUrl: any;
  constructor( private feedService: FeedService, private authService:AuthService,
  				private router: Router,
  				private route: ActivatedRoute,
          private flashMessage: FlashMessagesService
  				 ) { }

  ngOnInit() {
  	 
  	 //Get user data
    this.authService.getUserFeed().delay(5000).subscribe(userfeed => {
      this.feed = userfeed.feed;
  		//console.log('This user has the following data',this.feed[0].link);
var i = 0;
var total = this.feed.length;
var links = [];
for(; i < total; i++) {
   links.push(this.feed[ i ].link);
}
this.url = links;
console.log('The url contains', this.url);
var g = 0;
var l= this.url.length;
console.log('the length of links is',l);
var rss1 = String;
for(;  g<l; g++) {
  rss1= this.url[g];
}
this.rss=rss1;
console.log('The url is', rss1);
 this.feedUrl = rss1;
 var item = this.refreshFeed(rss1);
 
      // 	if (userfeed.success) {

    //   this.flashMessage.show('This is your feed', {cssClass:'alert-success', timeout: 5000});
    //   //this.router.navigate(['/']);
    //   //console.log('After Log in value is',this.authService.loggedIn());
    // } else {
    //    this.flashMessage.show(userfeed.msg, {cssClass:'alert-danger', timeout: 5000});
    //    //this.router.navigate(['/login']);
    // }
  		},
  		err=> {
  			console.log('This comes here',err);
  			return false;
  		});
    
  }
private refreshFeed(rss1) {
    this.feeds.length = 0;
    console.log('The feed url comes here' ,rss1);
    // Add 1s of delay to provide user feedback
    
    this.feedService.getFeedContent(this.feedUrl).delay(1000)
                    .subscribe(
                      feed => this.feeds = feed.items,
                      error => console.log(error)
                    );
  
  }
}
