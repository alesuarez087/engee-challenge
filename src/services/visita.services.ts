import { Injectable } from "@angular/core";
import { Visita } from "src/models/visita";


import jsonVisitas from '../assets/data/visitas.json';


@Injectable({providedIn:'root'})
export class VisitaServices{

    public visitas: Visita[] = [];

    constructor(){
        this.visitas = jsonVisitas;
    }

    public getVisitas(){
        return this.visitas;
    }

    public saveVisitas(visita:Visita){
        visita.id = this.visitas.length+1;
        this.visitas.push(visita);
    }

    public delete(visita:Visita){
        var index = this.visitas.indexOf(visita);
        this.visitas.splice(index, 1);
    }
}