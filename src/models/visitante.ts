export class Visitante{

    constructor(data: any){

        if(data != undefined){
            this.nombres = data.nombres;
            this.apellido = data.apellido;
            this.fechaNacimiento = data.fechaNacimiento;
            this.dni = data.dni
        }

    }

    apellido: string = '';
    nombres: string = '';
    fechaNacimiento: string = '';
    dni:string = '';
}