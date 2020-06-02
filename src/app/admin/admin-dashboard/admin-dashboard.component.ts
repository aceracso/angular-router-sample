import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SelectivePreloadingStrategyService } from 'src/app/selecting-preloading-strategy.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];

  constructor(private route: ActivatedRoute, private preloadStrategy: SelectivePreloadingStrategyService) {
    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {
    this.sessionId = this.route.paramMap.pipe(map(params => params.get('session_id') || 'None'));
    this.token = this.route.fragment.pipe(map(fragment => fragment || 'None'));
  }

}
