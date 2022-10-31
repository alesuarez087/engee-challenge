import { Injectable } from "@angular/core";
import { Visitante } from "src/models/visitante";

import jsonRenaper from '../assets/data/renaper.json';

@Injectable({providedIn:'root'})
export class RenaperServices{
    visitantes: Visitante[] = [];
    sectores: string[] = [];
    constructor(){
        this.visitantes = jsonRenaper;
    }

    public getVisitante(dni:string): any{
        return this.visitantes.find(r=>{
            return r.dni.match(dni);
        })
    }

}