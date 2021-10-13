import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  playState:boolean = true;
  muteState:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  play(video: HTMLVideoElement){
    this.playState ? video.pause() : video.play()
    this.playState = !this.playState
  }
  mute(video: HTMLVideoElement){
    this.muteState ? video.muted = false : video.muted = true;
    this.muteState = !this.muteState
  }

}
