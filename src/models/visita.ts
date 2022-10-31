export class Visita{

    constructor(data: any){

        if(data != undefined){
            this.fecha = data.fecha;
            this.hora = data.hora;
            this.visitoA = data.visitoA;
            this.id = data.id
        }

    }

    fecha: string = '';
    hora: string = '';
    id: number = 0;
    visitoA:string = '';
}