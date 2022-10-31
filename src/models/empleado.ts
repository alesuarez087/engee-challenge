export class Empleado{

    constructor(data: any){

        if(data != undefined){
            this.nombre = data.nombre;
            this.apellido = data.apellido;
            this.sector = data.sector;
        }

    }

    nombre: string = "";
    apellido: string = "";
    sector: string = "";
}