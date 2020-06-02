import { Component, OnInit, Input } from '@angular/core';
import { Crisis } from '../crisis';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CrisisService } from '../crisis.service';
import { DialogService } from 'src/app/dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  @Input() crisis: Crisis;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    private location: Location,
    public dialogService: DialogService) {
    }

  //ngOnInit() {
    // Crisis resolve in CrisisDetailResolver
    //this.getcrisis();
  //}

  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        //this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
  }

  private getcrisis(): void {
    this.crisisService.getCrisis(+this.route.snapshot.paramMap.get('id')).subscribe(crisis => this.crisis = crisis);
  }

  goBack() {
    this.location.back();
  }

  gotoCrises(crisis: Crisis) {
      const crisisId = crisis ? crisis.id : null;
      // Pass along the crisis id if available
      // so that the crisisList component can select that crisis.
      // Include a junk 'foo' property for fun.
      //this.router.navigate(['/crisis-center', { id: crisisId, foo: 'foo' }]);
      // Relative navigation back to the crises
      this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === 'foo') {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
