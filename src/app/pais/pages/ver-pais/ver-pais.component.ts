import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit{

  pais!: Country[];
  badges: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) {}

  ngOnInit(): void {

    this.activatedRoute.params.pipe(switchMap(({id}) => this.paisService.getPaisPorId(id)), tap(console.log)).subscribe(pais => {
      this.pais = pais;

      const {translations} = this.pais[0];
      const elementos = Object.values(translations);

      for (let index = 0; index < elementos.length; index++) {
        this.badges.push(elementos[index].common);
      }
    });
  }

}
