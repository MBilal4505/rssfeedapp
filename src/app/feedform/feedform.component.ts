import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-feedform',
  templateUrl: './feedform.component.html',
  styleUrls: ['./feedform.component.css']
})
export class FeedformComponent implements OnInit {
	link: String;
	user_id: String;
	email: String;
	user:any;
  constructor(private flashMessage: FlashMessagesService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
  			this.user = profile.user;
  			console.log('User contains following data',this.user);
  		},
  		err=> {
  			//console.log('This comes here',err);
  			return false;
  		});
  }

  onLinkSubmit(){
  	const link = {
  	email: this.user.email,
	link: this.link,
	user_id: this.user._id

	}
  //Register Link
    this.authService.addLink(link).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You Have added Link Successfully', {cssClass:'alert-success', timeout: 3000});
        this.router.navigate(['/profile']);
      } else {
          this.flashMessage.show('Link not added Something went wrong', {cssClass:'alert-danger', timeout: 3000});
          this.router.navigate(['/feedform']);
      }
    });
  }

}
