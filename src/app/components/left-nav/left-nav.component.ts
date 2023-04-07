import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { GlobalVariablesService } from '../../global-variables.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  activeNavClass: string = '';
  menuList:any=[]
  constructor(private route:Router,private gv: GlobalVariablesService) { }
  userDetails:any=this.gv.userDetail;
  ngOnInit(): void {
    // console.log(this.userDetails.role)
    this.menuList = this.gv.menuList[this.userDetails.role]
    // console.log(this.menuList)
  }
  clickedNav(currentValue: any) {
    this.activeNavClass = (currentValue).toLowerCase();
    this.route.navigate(['/'+this.activeNavClass]);
  }
}
