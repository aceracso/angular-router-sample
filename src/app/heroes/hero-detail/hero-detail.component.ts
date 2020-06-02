import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location) {
    }

  ngOnInit() {
    this.getHero();
  }

  private getHero(): void {
    this.heroService.getHero(+this.route.snapshot.paramMap.get('id')).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  gotoHeroes(hero: Hero) {
      let heroId = hero ? hero.id : null;
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}
