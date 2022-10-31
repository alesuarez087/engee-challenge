import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Empleado } from "src/models/empleado";

import jsonEmpleados from '../assets/data/empleados.json';

@Injectable({providedIn:'root'})
export class EmpleadoServices{

    //empleados:{nombre:string,apellido:string,sector:string}[] = [];
    empleados: Empleado[] = [];
    sectores: string[] = [];
    constructor(){
        this.empleados = jsonEmpleados;

        this.empleados.forEach(e =>{
            if(!this.sectores.find(s => s.match(e.sector))){
                this.sectores.push(e.sector);
            }
        })
    }

    public getEmpleados(): any[]{
        return this.empleados;
    }

    public getSectores(): any[]{
        return this.sectores;
    }

    public getEmpleadosSector(sector: string): any[]{
        var empleadosSeleccion: string[] = [];

        this.empleados.forEach(e=>{
            if(e.sector.match(sector)){
                empleadosSeleccion.push(e.nombre + " " + e.apellido)
            }
        });

        return empleadosSeleccion;

    }

}