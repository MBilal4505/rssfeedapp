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

  constructor(private flashMessage: FlashMessagesService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  }

  onLinkSubmit(){
  	const user = {
	link: this.link
	}
  //Register User
    this.authService.addLink(user).subscribe(data => {
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
