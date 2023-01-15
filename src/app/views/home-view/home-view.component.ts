import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit, AfterViewInit {

  // attributes
  // --------------------------------------------
  goalIconWidth = 150;
  autoscrollSeconds = 5;
  autoscrollContainer?: HTMLElement;
  @ViewChild('autoscroll') autoscrollContainerRef?: ElementRef;
  goalIds = Array.from(Array(17).keys()).map(x => x + 1);


  // lifecycle
  // --------------------------------------------
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.initAutoscroll();
  }


  // methods
  // --------------------------------------------
  initAutoscroll() {
    // find #autoscroll
    this.autoscrollContainer = this.autoscrollContainerRef?.nativeElement;
    if (!this.autoscrollContainer) {
      console.error("failed to start autoscroll: #autoscroll was not found");
      return;
    }
    // start autoscrolling
    setInterval(() => {
      let rewinded = this.rewindAutoscrollIfNeeded();
      if (rewinded) { return; }
      this.autoscrollContainer?.scrollBy({left: this.goalIconWidth, behavior: "smooth"});
    }, this.autoscrollSeconds * 1000);
  }

  rewindAutoscrollIfNeeded(): Boolean {
    let leftScroll = this.autoscrollContainer!.scrollLeft;
    let containerWidth = this.autoscrollContainer!.clientWidth;
    let scrollWidth = this.autoscrollContainer!.scrollWidth;
    if (leftScroll + containerWidth >= scrollWidth) {
      this.autoscrollContainer?.scrollTo({left: 0, behavior: "smooth"});
      return true;
    }
    return false;
  }

  onIosClick() {
    console.log("ios click...");
  }
  onAndroidClick() {
    console.log("android click...");
  }
  onShareClick() {
    console.log("share click...");
  }
}
