import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Visita } from "src/models/visita";
import { Visitante } from "src/models/visitante";
import { EmpleadoServices } from "src/services/empleado.services";
import { RenaperServices } from "src/services/renaper.services";
import { VisitaServices } from "src/services/visita.services";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'formulario',
    templateUrl: 'formulario.comp.html',
    styleUrls: ['formulario.comp.scss']
  })
  
  
export class FormularioComp implements OnInit {
    
    public register: FormGroup;    
    public formVisita: FormGroup;
    public sectores: string[] = [];
    public sectorSeleccionado: string = '';
    public visitante: Visitante = new Visitante({});
    public nombreVisita: string = '';
    public empleadosSector: string []  = [];
    public visitas: Visita[] = [];
    public date: string = '';
    public time: string = '';
    public matcher = new MyErrorStateMatcher();

    @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['Id', 'Fecha', 'Hora', 'VisitoA', 'delete'];

    constructor(private servicesEmpleado: EmpleadoServices, private servicesRenaper: RenaperServices, private servicesVisita: VisitaServices){
        this.sectores = this.servicesEmpleado.getSectores();

        this.register = new FormGroup({
            nroTajetaIngreso: new FormControl('', [Validators.required]),
            sector: new FormControl('', [Validators.required]),
            visita: new FormControl('', [Validators.required]),
          });

        this.formVisita = new FormGroup({
          dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9)])
        });

        this.visitas = this.servicesVisita.getVisitas();
        this.dataSource = new MatTableDataSource(this.visitas);


        var fecha = new Date();
        this.date = fecha.toLocaleDateString();
        this.time = fecha.getHours() + ":" + fecha.getMinutes();
    }

    ngOnInit() {
        
      this.dataSource.paginator = this.paginator

        this.register = new FormGroup({
            //dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]),
            nroTajetaIngreso: new FormControl('', [Validators.required]),
            sector: new FormControl('', [Validators.required]),
            visita: new FormControl('', [Validators.required]),
          });
          
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.register.controls[controlName].hasError(errorName);  
    }

    public save(){

      var fecha = new Date();
        var visita = new Visita({
          fecha: fecha.toLocaleDateString(),
          hora: fecha.getHours() + ":" + fecha.getMinutes().toPrecision(2),
          visitoA: this.register.value.visita
        });

        this.servicesVisita.saveVisitas(visita);
        this.dataSource = new MatTableDataSource(this.visitas);
    }

    public cambioSector(event: any){
        this.empleadosSector = [];
        this.empleadosSector = this.servicesEmpleado.getEmpleadosSector(this.sectorSeleccionado);
        console.log(this.empleadosSector);
    }

    public buscarVisitante(){
        this.visitante = this.servicesRenaper.getVisitante(this.formVisita.value.dni.toString());

        this.nombreVisita = this.visitante.nombres + " " + this.visitante.apellido
    }
  
    delete(item: Visita){

      if (confirm("Seguro que quiere eliminar la visita de '" + item.visitoA + "'?")) {
        this.servicesVisita.delete(item);        
        alert("Eliminado");
        
        this.visitas = this.servicesVisita.getVisitas();
        this.dataSource = new MatTableDataSource(this.visitas);              
      }
    }
}
