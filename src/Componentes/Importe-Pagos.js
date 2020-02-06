import React from 'react'
import ImporteList from './Importe-List'
import TableImporteHeader from './Table-Importe-Header'
import TableImporteFooter from './Table-Importe-Footer'
import Alumno from './Alumno'
import AlumnoCodigo from './AlumnoCodigo'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App.css';
import PropTypes from 'prop-types';
import Imprimir2 from './imprimir2';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import FormularioIntermio from './formulario-intermedio';
import ComponenteEditable from './ComponenteEditable'
import ImporteDolar from './ImporteDolar';
import CostoDelPrograma from './Costo-Del-Programa';
import DeudaTotal from './Deuda-Total';
import CostoDelProgramaDet from './Costo-Del-Programa-Det';

import Select from 'react-select';
import {
  ModalFooter, ModalBody, ModalHeader, Modal, Button
} from 'reactstrap';
import ImprimirImportePago from './Imprimir-Importe-Pago'
import TablaOtrasObligaciones from './Tabla-Otras-Obligaciones'
//import TablaOtrasObligCanceladas from './Tabla_Otras_Oblig_Canceladas'

//ESTA ES LA VISTA PRINCIPAL POR NOMBRES Y APELLIDOS

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

class ImportePagos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seleccionado:false,
      validado:false,
      datosformulario:[],
      aparecer:true,
      todos:false,
      checkbox_:[],
      filtros: [],
      pagocero: [],
      pagoUno:[],
      pagoDos:[],
      pagoTres:[],
      pagoCuatro:[],
      pagocerovalidado: [],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado:0,
      filtroDel:new String(""),
      filtroAl:new String(""),
      filtroNumeros: [],
      alumno: {},
      conceptos:[], //Conceptos del Alumno
      configuraciones:[],//Data Configuraciones
      costosP: {},
      concepto:[], // value y label de CONCEPTOS
      datos:[],   //Data Conceptos
      monedas:[], //Data Monedas
      monedasvl:[],// value & label de Monedas
      ubicaciones:[],//Data Ubicacion
      ubicacionesv1:[],//value & label Ubicacion
      tipos:[],
      tiposv1:[],
      defuncion: 1,
      estadoAlumno:"",
      nombrePrograma:"",    //Nombre del programa del alumno
      codigoPrograma:0,     //Codigo del Programa
      codigoAlumno: "",     //Codigo del alumno
      anioIngresoAlumno: 0,
      valorBeneficio:0,     //beneficio del alumno
      importeTabla1:0,
      importeTabla2:0,
      importeTabla3:0,
      importeTabla:[],
      valorDeudaTotal:0,
      sumaImporteUPG:0,
      sumaImporteEPG:0,
      sumaImporteDE:0,
      showDetCosto:false,
      costoxciclo:[],
      otrasObligaciones:[],
      otrasObligacionesC:[],

      bool1:0,
      bool2:0,
      bool3:0,

      valor: true,
      estadoAlumnoInput:{value:"-1",label:"Escoga un nuevo estado"},
      optionsEstadoAlumno:[{value:"casado",label:"Casado"},
      {value:"soltero",label:"Soltero"},
      {value:"divorciado",label:"Divorciado"},
      {value:"viudo",label:"Viudo"},
      {value:"separado",label:"Separado"},
      {value:"conviviente",label:"Conviviente"},
      {value:"fallecido",label:"Fallecido"}
    ],
      showModalConfiguracion:false,

      tipoObligacionInput:{value:"-1",label:"Escoga un Tipo de Obligación"},
      optionsTipoObligacion:[{value:"repitencia",label:"Repitencia"},
                            {value:"multa",label:"Multa"}
                             ],

      showAgregarObligacion:false,
    }
    this.clase='';
    this.alumno = '';
    this.importe = 0;
    this.showboolean = true;

    
    this.reporte_ciclo = this.reporte_ciclo.bind(this);
    this.reporte_credito = this.reporte_credito.bind(this);
 //   this.arreglosReporte = this.arreglosReporte.bind(this);

    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.FuncionUno=this.FuncionUno.bind(this);
    this.FuncionDos=this.FuncionDos.bind(this);
    this.FuncionTres=this.FuncionTres.bind(this);
    this.FuncionCuatro=this.FuncionCuatro.bind(this);
    this.Regresar=this.Regresar.bind(this);
    this.AddCostoImporte=this.AddCostoImporte.bind(this);
    this.UpdateCostoImporte=this.UpdateCostoImporte.bind(this);
  }
componentDidUpdate(){
    if(this.state.estado!=0){
      
    
      var checks=document.getElementsByClassName("checkbox1");
      /*console.log(checks[0].id);
      console.log(this.state.estado);
      checks[0].checked=true;*/

      for(let i=0;i<checks.length;i++){
         var id=checks[i].id;
         for(let j=0;j<this.state.pagocero.length;j++){
             var codigo=this.state.pagocero[j].idRec;
             if(this.state.pagocero[j].check==true){
               if(id==codigo){
                 checks[i].checked=true;
               }
             }
          }
      }
      
      
    }
    else{
         this.setState({estado:1})
        }
 }


componentWillMount() {
    this.pageOfItems = this.pagocero;
    var checkbox_selec=[];
    var nombres = this.state.name;
    var checks=document.getElementsByClassName("checkbox1");
    var checks_normales=Array.from(checks);
    checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
     }
   });
   console.log("this.state.name")
   console.log(this.state.name)


      //DATOS DE LOS CONCEPTOS
    var array=[];
    var conceptoResto=[];

    fetch(CONFIG+'/concepto/conceptos')
    .then((response)=>{
        return response.json()
    }).then((listas)=>{
        console.log("DATA CONCEPTOS")
        console.log(listas)

        this.setState({
          datos:listas
        })

        /*for(let i =3 ;i<listas.length;i++){
          conceptoResto.push(listas[i].concepto)
        }*/
        listas.forEach(function(element) {
          var e={value:element.concepto,label:element.concepto};
          array.push(e);
        });
    })
    .catch(error=>{
        console.error(error)
    });
        console.log("CONCEPTOS (value-label)");
        console.log(array);
        console.log("Conceptos restantes");
        console.log(conceptoResto);
    this.setState({
      concepto:array
    })

    //DATOS DE LOS BENEFICIOS
    fetch(CONFIG+'/beneficio/listar/' + this.state.name)
    .then((response)=>{
        return response.json()
    })
    .then((beneficio)=>{
        console.log("DATA BENEFICIO ");
        console.log(beneficio);
      this.setState({
        valorBeneficio:beneficio[0].benef_otrogado
      })
      console.log("Valor del Benefecio");  
      console.log(this.state.valorBeneficio);
    })
    .catch(error=>{
        console.error(error)
    });

    //FILTRADO DE TABLAS

  var listaImportesTabla=[];

   var concepA = [];
   concepA.push("210010  ");
   var concepB = [];
   concepB.push("210011  ");
   var concepC = [];
   concepC.push("207010  ");
   var concepD = ["210322  ","201158  ","210003","210024","201158  ","210209  ",
                "210059  ","210353  ","210509  ","210308  ","210322  ","201011  ",
                "210104  ", "999998  ","207011  ","210508  ","210003  ","207004  ",
                "210154  ","96509700", "96509701","210025  ","96509702","210014  ",
                "96509703", "201459  ", "207007  ", "201302  ", "210257  ","999999  ",
                 "207078  ", "210165  ","210169  ", "210112  ",
                "210168  ", "201169  ", "210006  ", "210173  ", "210105  ", "201202  ",
                "210103  ",  "210071  ", "210050  ",
                "210352  ", "210086  ", "210081  ", "210068  ", "210023  ",  "210202  ",
                  "210012  ",  "210013  ", "207006  ", 
                "207103  ",  "207081  ",  "207080  ",  "207079  "]
    

   console.log("CD: ");   
   console.log(concepD);
   var filtrodel = "0000-00-00";
   var filtroal = "9999-12-12";
   
   let nombreFiltro = this.state.name;
   var separadorFiltro = " "; // un espacio en blanco
   var arregloDeSubCadenasFiltro = nombreFiltro.split(separadorFiltro);
   var arregloFiltro = [];
   for (let i = 0; i< arregloDeSubCadenasFiltro.length; i++) {
     if(arregloDeSubCadenasFiltro[i]!==''){
        arregloFiltro.push(arregloDeSubCadenasFiltro[i])
        console.log("P: "+arregloFiltro);
     }
   }
   var nombrenuevoFiltro = arregloFiltro.join(" & ");
   console.log("ABCD:-"+nombrenuevoFiltro+"-");
   
   
  
   
   fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar', //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
   {
     headers: {
       'Content-Type': 'application/json'
     },
     method: "POST",
     body: JSON.stringify(
       {
         "nom_ape": nombrenuevoFiltro,
         "fechaInicial": filtrodel,
         "fechaFinal": filtroal,
         "conceptos": concepA,
         "recibos":this.state.filtroNumeros
       }
 
     )
   }
   ).then((response) => {
     return response.json()
   })
   .then((pagos) => {
     if(pagos.length > 0){
       this.setState({  pagoUno: pagos  });
       //swal("Filtro realizado exitosamente!","","success");
     }else{
       //swal("No se encontraron registros","","info");
     }
   })
   .catch(error => {
   swal("Oops, Algo salió mal!!", "","error")// si hay algún error lo mostramos en consola
   });
 
   fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar', //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
   {
    
     headers: {
       'Content-Type': 'application/json'
     },
     method: "POST",
     body: JSON.stringify(
       {
         "nom_ape": nombrenuevoFiltro,
         "fechaInicial": filtrodel,
         "fechaFinal": filtroal,
         "conceptos": concepB,
         "recibos":this.state.filtroNumeros
       }
 
     )
   }
   ).then((response) => {
     return response.json()
   })
   .then((pagos) => {
     if(pagos.length > 0){
       this.setState({  pagoDos: pagos  });
       //swal("Filtro realizado exitosamente!","","success");
     }else{
       //swal("No se encontraron registros","","info");
     }
   })
   .catch(error => {
   swal("Oops, Algo salió mal!!", "","error")// si hay algún error lo mostramos en consola
   });

   fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar', //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
   {
     headers: {
       'Content-Type': 'application/json'
     },
     method: "POST",
     body: JSON.stringify(
       {
         "nom_ape": nombrenuevoFiltro,
         "fechaInicial": filtrodel,
         "fechaFinal": filtroal,
         "conceptos": concepC,
         "recibos":this.state.filtroNumeros
       }
 
     )
   }
   ).then((response) => {
     return response.json()
   })
   .then((pagos) => {
     if(pagos.length > 0){
       this.setState({  pagoTres: pagos  });
       //swal("Filtro realizado exitosamente!","","success");
     }else{
       //swal("No se encontraron registros","","info");
     }
   })
   .catch(error => {
   swal("Oops, Algo salió mal!!", "","error")// si hay algún error lo mostramos en consola
   });

   console.log("Conceptos restantes Antes");
   console.log(conceptoResto)
   fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar', //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
   {
     headers: {
       'Content-Type': 'application/json'
     },
     method: "POST",
     body: JSON.stringify(
       {
         "nom_ape": nombrenuevoFiltro,
         "fechaInicial": filtrodel,
         "fechaFinal": filtroal,
         "conceptos": concepD,
         "recibos":this.state.filtroNumeros
       }
 
     )
   }
   ).then((response) => {
     return response.json()
   })
   .then((pagos) => {
     if(pagos.length > 0){
       this.setState({  pagoCuatro: pagos  });
       
   console.log("Conceptos restantes Despues");
   console.log(conceptoResto)
       //swal("Filtro realizado exitosamente!","","success");
     }else{
       //swal("No se encontraron registros","","info");
     }
   })
   .catch(error => {
   swal("Oops, Algo salió mal!!", "","error")// si hay algún error lo mostramos en consola
   });

{/*XXXXXXXXXXXXXXXXXXXXXXXXXX*/ }


     

//DATA DE LAS CONFIGURACIONES

   console.log("link configuraciones")
    console.log(CONFIG+'configuracion/listar/')

    fetch(CONFIG+'configuracion/listar/')
      .then((response) => {
        return response.json()
      })
      .then((listas) => {
        console.log("DATA CONFIGURACIONES")
        console.log(listas);
        this.setState({
          configuraciones: listas
        },
        );
      })
      .catch(error => {
        console.error(error)
      });

//DATA MONEDAS
    var array2=[];
    fetch(CONFIG+'/concepto/monedas')
    .then((response)=>{
        return response.json()
    }).then((listas)=>{
        console.log("DATA MONEDAS")
        console.log(listas)

        this.setState({
          monedas: listas
        })
        listas.forEach(function(element) {
          var e={value:element.moneda,label:element.moneda};
          array2.push(e);
        });
    })
    .catch(error=>{
        console.error(error)
    });
    console.log("Monedas (value-label)");
    console.log(array2)
    this.setState({
      monedasvl:array2
    })
//DATA UBICACIONES
var array3=[];
fetch(CONFIG+'/concepto/ubicaciones')
.then((response)=>{
    return response.json()
}).then((listas)=>{
    console.log("DATA UBICACIONES")
    console.log(listas)

    this.setState({
      ubicaciones: listas
    })
    listas.forEach(function(element) {
      var e={value:element.descripcion,label:element.descripcion};
      array3.push(e);
    });
})
.catch(error=>{
    console.error(error)
});
console.log("Ubicacion (value-label) ");
console.log(array3)
this.setState({
  ubicacionesv1:array3
})

//DATA TIPO DE CUENTA
var array4=[];
fetch(CONFIG+'/concepto/cuentas')
.then((response)=>{
    return response.json()
}).then((listas)=>{
    console.log("DATA TIPO DE CUENTA")
    console.log(listas)

    this.setState({
      cuentas: listas
    })
    listas.forEach(function(element) {
      var e={value:element.descripcion,label:element.descripcion};
      array4.push(e);
    });
})
.catch(error=>{
    console.error(error)
});
console.log("Tipo Cuentas (value-label)");
console.log(array4)

this.setState({
  cuentasv1:array4
})



    var separador = " "; // un espacio en blanco
    //console.log("nombres");
    //console.log(nombres);
    var arregloDeSubCadenas = nombres.split(separador);
    console.log("arreglo de subcadenas");
    console.log(arregloDeSubCadenas);
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }
    //console.log("arreglo sin espacios en blanco");
    //console.log(arreglo);
    var nombrenuevo = arreglo.join(" & ");
    //console.log("arreglo con join &")
    //console.log(nombrenuevo);
    var nombreAlumno = arreglo.join(" ");
    //console.log("arreglo con join")
    //console.log(nombreAlumno);
//ANTERIOR LINK
//https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/


    //TRANSFORMANDO PARAMETRO
    var nombresTrans = nombres;
    var pruebita = parseInt(nombresTrans);
    console.log("pruebita")
    console.log(pruebita);

if(isNaN(pruebita)){
      this.clase=Alumno;
      console.log("Alumno");
      console.log(Alumno);
    
      fetch(CONFIG+'recaudaciones/alumno/concepto/listar/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
        console.log("Lista de Pagos por Alumno");
        console.log(pagos);
        var auxPagos = pagos;

        var alumnoDetalle = {
        apeNom: nombreAlumno
        }
        this.setState({
          pagocero: pagos,
          pagos: pagos,
          alumno: alumnoDetalle
        },
        );
      var total=this.state.pagocero;
      this.state.pagocero.map((pago)=>{
        pago.check=false
      })
      /****************************** */
      fetch(CONFIG+'beneficio/comprobacion/' + nombrenuevo)//CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
      .then((response)=>{
          return response.json()
      }).then((comprobacion)=>{//costos
          console.log("COMPROBACION");
          console.log(comprobacion);
          if(comprobacion ==  1 ){
              //console.log("toffe");
              this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
          }
          else if(comprobacion == 2) {
              //console.log("oso");
              this.reporte_ciclo(nombrenuevo,auxPagos,2);
          }
          else if(comprobacion == 3){
               if(comprobacion.tipo == "por ciclo"){
                   this.reporte_ciclo(nombrenuevo,auxPagos,0);
               }
               else{
                   this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
               }
          }

      })
      .catch(error=>{
          console.error(error)
      });
/****************************** */
      }
    )
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });

    //LINK ANTERIOR::
    //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
    fetch(CONFIG+'concepto/leer/restringido/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        console.log("Lista de Concepto por ALumno");
        console.log(conceptos);

        for(let i =0 ;i<conceptos.length;i++){
          if(conceptos[i].concepto != "207010  " && conceptos[i].concepto != "210010  " && conceptos[i].concepto != "210011  " ){
              conceptoResto.push(conceptos[i].concepto)
          }
        }
        this.setState({
          conceptos: conceptos,
        }
        );
      })
      .catch(error => {
        console.error(error)
      });
        console.log("Conceptos restantes 1");
        console.log(conceptoResto)
    }
    else{
      this.clase=AlumnoCodigo
      console.log("AlumnoCodigo");
      console.log(AlumnoCodigo);

      fetch(CONFIG+'/beneficio/listar/' + nombrenuevo)
        .then((response)=>{
            return response.json()
        }).then((datos)=>{

          console.log("BENEFICIOS: datos");
          console.log(datos);
          this.setState({datosformulario: datos})

        })
        .catch(error=>{
            console.error(error)
        });

      fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {

         console.log("Lista de Pagos por Alumno");
         console.log(pagos);

        var auxPagos = pagos;
        var alumnoDetalle = { apeNom: nombreAlumno }

        this.setState({
          pagocero: pagos,
          pagos: pagos,
          alumno: alumnoDetalle,
        },
        );
        var total=this.state.pagocero;

        this.state.pagocero.map((pago)=>{
          pago.check=false
        })
      // console.log(this.state.pagocero); colocar=()=>{

      fetch(CONFIG+'beneficio/comprobacion/' + nombrenuevo)//CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
      .then((response)=>{
          return response.json()
      }).then((comprobacion)=>{//costos
          console.log("COMPROBACION");
          console.log(comprobacion);
          if(comprobacion ==  1 ){
              //console.log("toffe");
              this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
          }
          else if(comprobacion == 2) {
              //console.log("oso");
              this.reporte_ciclo(nombrenuevo,auxPagos,2);
          }
          else if(comprobacion == 3){
               if(comprobacion.tipo == "por ciclo"){
                   this.reporte_ciclo(nombrenuevo,auxPagos,0);
               }
               else{
                   this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
               }
          }

      })
      .catch(error=>{
          console.error(error)
      });

      }
    )
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });
    //LINK ANTERIOR::
    //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
    console.log("link conceptos")
    console.log(CONFIG+'concepto/leer/restringido/' + nombrenuevo)

    fetch(CONFIG+'concepto/leer/restringido_cod/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        console.log("Lista de Concepto por ALumno");
        console.log(conceptos);
        
        for(let i =0 ;i<conceptos.length;i++){
          if(conceptos[i].concepto != "207010  " && conceptos[i].concepto != "210010  " && conceptos[i].concepto != "210011  " ){
              conceptoResto.push(conceptos[i].concepto)
          }
          
        }
        this.setState({
          conceptos: conceptos
        },
        );
      })
      .catch(error => {
        console.error(error)
      });
      
      console.log("Conceptos restantes 2");
      console.log(conceptoResto)

    }

    
        //
        //DE AQUI SACAMOS LOS DATOS DE LA LISTA DE PAGOS 
        //fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
        fetch(CONFIG+'recaudaciones/alumno/concepto/listar_validados/' + nombrenuevo)
        .then((response) => {
        return response.json();
        })
        .then((pagos)  =>{
          console.log("Programa de lista de pagos");
         console.log(pagos);

          this.setState({
          estadoAlumno: pagos[0].estado_civil,
          nombrePrograma: pagos[0].sigla_programa,
          codigoPrograma: pagos[0].idPrograma,
          codigoAlumno: pagos[0].codAlumno,
          anioIngresoAlumno: pagos[0].anio_ingreso
          })
          console.log(this.state.estadoAlumno);
          console.log(this.state.nombrePrograma);
          console.log(this.state.codigoPrograma);
          console.log(this.state.codigoAlumno);
          console.log(this.state.anioIngresoAlumno);

          

          fetch(CONFIG+'importealumno/search/'+this.state.codigoAlumno+'/'+this.state.codigoPrograma+'/9')
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
            console.log("Importe 1");
              console.log(data.importe)
              this.setState({
                importeTabla1: data.importe,
                bool1: 1,
                })
                listaImportesTabla.push(data.importe);
                console.log("Importe 2");
                console.log(this.state.importeTabla1);
                
                console.log(this.state.listaImportesTabla);
                document.getElementById("costoUno").value = this.state.importeTabla1;
          })
          .catch(error => {
            console.error(error)
          });

          fetch(CONFIG+'importealumno/search/'+this.state.codigoAlumno+'/'+this.state.codigoPrograma+'/21')
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
            console.log("Importe 3");
              console.log(data.importe)
              this.setState({
                importeTabla2: data.importe,
                bool2: 1,
                })
                listaImportesTabla.push(data.importe);
                console.log("Importe 4");
                console.log(this.state.importeTabla2);
                console.log(this.state.listaImportesTabla);
                
                document.getElementById("costoDos").value = this.state.importeTabla2;
          })
          .catch(error => {
            console.error(error)
          });

          fetch(CONFIG+'importealumno/search/'+this.state.codigoAlumno+'/'+this.state.codigoPrograma+'/117')
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
            console.log("Importe 5");
              console.log(data.importe)
              this.setState({
                importeTabla3: data.importe,
                bool3: 1,
                })
                listaImportesTabla.push(data.importe);
                console.log("Importe 6");
                console.log(this.state.importeTabla3);
                console.log(this.state.listaImportesTabla);
                
                document.getElementById("costoTres").value = this.state.importeTabla3;
          })
          .catch(error => {
            console.error(error)
          });

          this.setState({
            importeTabla:listaImportesTabla
          })  
          /**Costos x Ciclo */
          var arrayCostosDet=[];
          var num=0;
          fetch("https://costoprogramas-back.herokuapp.com/presupuestos/"+this.state.codigoPrograma)
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
            console.log("DATA COSTOxCICLO2");
              console.log(data)

              data.programaPresupuestoDetalles.forEach(function(concepto) {
                num=num+1;
                  var e ={id: num, ciclo:concepto.programaCiclo.ciclo, concepto:concepto.concepto.concepto, monto:concepto.importe};
                arrayCostosDet.push(e);
                
              });
              console.log("DATA COSTOxCICLO3");
              console.log(arrayCostosDet);
              
          })
          .catch(error => {
            console.error(error)
          });
          this.setState({
            costoxciclo:arrayCostosDet,
          })
          console.log("DATA COSTOxCICLO4");
          console.log(this.state.costoxciclo);

          /**OTRAS OBLIGACIONES PENDIENTES DE PAGO */
          var arrayObligacion=[];
          
          fetch(CONFIG+'importealumnoobligaciones/search/'+this.state.codigoAlumno+'/'+this.state.codigoPrograma)
          .then((response)=>{
              return response.json()
          })
          .then((listaOblig)=>{
            console.log("Otras Obligaciones");
              console.log(listaOblig);

              /*if(listaOblig.length==1){
                var e ={id: num, id_tipo_oblig:listaOblig.id_tipo_obligacion,descripcion:listaOblig.descripcion,id_concepto:listaOblig.cod_concepto,  
                  id_moneda:listaOblig.id_moneda,importe:listaOblig.importe,id_estado:listaOblig.id_tobligacion_estado};
                 arrayObligacion.push(e);
              }else{*/
                listaOblig.forEach(function(data) {
                  
                    var e ={id: data.id_importe_alumno_obligaciones, id_tipo_oblig:data.id_tipo_obligacion,descripcion:data.descripcion,id_concepto:data.cod_concepto,  
                            id_moneda:data.id_moneda,importe:data.importe,id_estado:data.id_tobligacion_estado};
                  arrayObligacion.push(e);
                  
                }); 

              //}
                            
          })
          .catch(error => {
            console.error(error)
          });
          this.setState({
            otrasObligaciones:arrayObligacion,
          })
          console.log("Otras Obligaciones-Det");
          console.log(this.state.otrasObligaciones);



           
        });

         

console.log("IMPORTE TABLA")
console.log(this.state.importeTabla)

/**Calculo de la deuda Total */
  /*  var deudaUpg = this.state.importeTabla1 - this.state.sumaImporteUPG;
    var deudaEpg = this.state.importeTabla3 - this.state.sumaImporteEPG;
    var deudaDE = this.state.importeTabla2 - this.state.sumaImporteDE;
    var deudaTotal = 0;

    console.log("DeudaUPGl:"+this.state.importeTabla1);
    console.log("DeudaUPG2:"+this.state.sumaImporteUPG);
    console.log("DeudaUPG:"+deudaUpg);
    console.log("DeudaEpg:"+deudaEpg);
    console.log("DeudaDE:"+deudaDE);

    if(deudaUpg>=0){
      deudaTotal = deudaTotal + deudaUpg;
    }
    if(deudaEpg>=0){
      deudaTotal = deudaTotal + deudaEpg;
    }
    if(deudaDE>=0){
      deudaTotal = deudaTotal + deudaDE;
    }
    this.setState({
      valorDeudaTotal: deudaTotal
      })*/


      fetch("https://costoprogramas-back.herokuapp.com/presupuestos?idPrograma=7&idProgramacionPagos=1")
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
            console.log("DATA COSTOxCICLO");
              console.log(data)
              
          })
          .catch(error => {
            console.error(error)
          });

          
  }

//FUNCION PARA REGRESAR A LA VISTA ANTERIOR
Regresar=(e)=>{
    //browserHistory.push('/'+this.state.name);
    browserHistory.push('/');
    e.preventDefault();
}

  render() {
    if (this.state.pagos.length > 0) {
      return (
      
      <div id="main" className="">


        <div>
          <h3>Importe de pago por alumno
            <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={browserHistory.goBack} >Regresar<i className="material-icons right">reply</i></a></li>
            </ul>
          </h3>
          <hr/>
            <div className="SplitPane row">
              <div className=" col-xs-3">

                  <h4  className="center">DATOS PERSONALES</h4>
                  <div className="center datos">
                    <i className="material-icons medium">account_circle</i>
                  </div>
                  
                  <h6 align="center" className="Alumno"><b>Nombres:</b></h6>
                  <h6 align="center" className="negro">{this.state.pagos[0].apeNom}</h6>
                  <h6 align="center" className="Alumno"><b>Código:</b></h6>
                  <h6 align="center" className="negro">{this.state.pagos[0].codAlumno}</h6>
                  <h6 align="center" className="Alumno"><b>Programa:</b></h6>
                  <h6 align="center" className="negro">{this.state.nombrePrograma}</h6>
                  <h6 align="center" className="Alumno"><b>Periodo de Ingreso:</b></h6>
                  <h6 align="center" className="negro">{this.state.anioIngresoAlumno}</h6> 
                  
              </div>

              
              {this.state.showDetCosto?(
                
                <div className=" col-xs-3"> 
                <CostoDelProgramaDet datosPrograma = {this.state.datosformulario} datosCosto={this.state.costosP}/>
                </div>
              ):(
                <div> 
                </div>
              )
              
            }

                <div className=" col-xs-3"> 
                <CostoDelProgramaDet  costoxciclo={this.state.costoxciclo}/>
                </div>
                                   
              
            
              <div className=" col-xs-6">
                  {/*<h6 align="center" className="Alumno"><b>Costo total del Programa:</b></h6>
                      <h6 align="center" className="negro">S/.</h6>
                  <h6 align="center" className="Alumno"><b>Beneficio:</b></h6>
                      <h6 align="center" className="negro">DSTO {this.state.valorBeneficio}% UNMSM</h6>*/}
                      
                      <CostoDelPrograma datosPrograma = {this.state.datosformulario} datosCosto={this.state.costosP}/>
              </div>

            </div>
          
            <hr/>
          <div className="SplitPane row Padding_bottom" >
          <ImprimirImportePago  validado = {this.state.validado} seleccionado={this.state.seleccionado} listado={this.state.pagocero} conceptos={this.state.conceptos} alumno={this.state.alumno} costos={this.state.costosP} datos={this.state.datosformulario} valorCosto1 ={this.state.importeTabla1} valorCosto3 ={this.state.importeTabla3} valorCosto2 ={this.state.importeTabla2} />
          </div>
          
          
          

          <div className="row">
            <div className="  col-md-12">
              
            <table className="tableImportes">
                <tr >
                  <th className="thLabel">MATRÍCULA UPG</th>
                  <th className="thLabel">MATRÍCULA EPG</th>
                </tr>
                
                <tr className="trTable">
                  <td className="tdTable">
                    <table className="tableImporte" >
                      <thead>
                        <tr>
                          <th className="thVacio"></th><th className="thVacio"></th><th className="thVacio"></th>
                          <th className="th">COSTO</th>
                          <th >S/ <input id ="costoUno"  disabled="true" type="number" color="white" className="inputCosto"/></th>
                          <th className="thVacio" ><button onClick={this.EditarCostoUno} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
                          <button onClick={this.GuardarCostoUno} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></th>
                        </tr>
                      </thead>
                      <TableImporteHeader   />
                      <ImporteList funcion={this.FuncionUno} listado={this.state.pagoUno}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl} ubicaciones={this.state.ubicacionesv1} cuentas={this.state.cuentasv1} configuraciones={this.state.configuraciones}/>
                      <TableImporteFooter total ={this.CalcularImporteUno()} costo ={this.state.importeTabla1} />
                    </table>
                  </td>
                  <td className="tdTable">
                    <table className="tableImporte">
                      <thead>
                        <tr>
                          <th className="thVacio"></th><th className="thVacio"></th><th className="thVacio"></th>
                          <th className="th">COSTO</th>
                          <th  >S/ <input id ="costoTres"  disabled="true" type="number" className="inputCosto"/></th>
                          <th className="thVacio" ><button onClick={this.EditarCostoTres} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
                          <button onClick={this.GuardarCostoTres} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></th>
                        </tr>
                      </thead>
                      <TableImporteHeader   />
                      <ImporteList funcion={this.FuncionTres} listado={this.state.pagoTres}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl} ubicaciones={this.state.ubicacionesv1} cuentas={this.state.cuentasv1} configuraciones={this.state.configuraciones}/>
                      <TableImporteFooter total ={this.CalcularImporteTres()} costo ={this.state.importeTabla3}/>
                    </table>
                  </td>
                </tr>
                <tr className="trTable">
                  <th className="thLabel">DERECHO ENSEÑANZA</th>
                  <th className="thLabel">OTROS PAGOS</th>
                </tr>
                <tr className="trTable">
                  <td className="tdTable">
                    <table className="tableImporte">
                      <thead>
                        <tr>
                          <th className="thVacio"></th><th className="thVacio"></th><th className="thVacio"></th>
                          <th className="th">COSTO</th>
                          <th  >S/ <input id ="costoDos"  disabled="true" type="number" className="inputCosto"/></th>
                          <th className="thVacio" ><button onClick={this.EditarCostoDos} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
                          <button onClick={this.GuardarCostoDos} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></th>
                        </tr>
                      </thead>
                      <TableImporteHeader   />
                      <ImporteList funcion={this.FuncionDos} listado={this.state.pagoDos}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl} ubicaciones={this.state.ubicacionesv1} cuentas={this.state.cuentasv1} configuraciones={this.state.configuraciones}/>
                      <TableImporteFooter total ={this.CalcularImporteDos()} costo ={this.state.importeTabla2}/>
                    </table>
                  </td>
                  <td className="tdTable">
                    <table className="tableImporte"> 
                      {/*<thead>
                        <tr>
                          <th className="thVacio"></th><th className="thVacio"></th><th className="thVacio"></th>
                          <th className="th">COSTO</th>
                          <th className="th" >S/ <input id ="costoCuatro"  disabled="true" type="number" className="th"/></th>
                          <th className="thVacio" ><button onClick={this.EditarCostoCuatro} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
                          <button onClick={this.GuardarCostoCuatro} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></th>
                          
                          </tr>
                      </thead>*/}
                      <TableImporteHeader   />
                      <ImporteList  funcion={this.FuncionCuatro} listado={this.state.pagoCuatro}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl} ubicaciones={this.state.ubicacionesv1} cuentas={this.state.cuentasv1} configuraciones={this.state.configuraciones}/>
                      {/*<TableImporteFooter total ={this.CalcularImporteCuatro()}/>*/}
                    </table>
                        {/**Aqui iba las tablas obligaciones */}
                        <TablaOtrasObligaciones otrasObligaciones={this.ActualizarObligaciones()}  codAlumno={this.state.codigoAlumno} codPrograma={this.state.codigoPrograma} dataConcepto={this.state.datos} conceptoVL={this.state.concepto} dataMoneda={this.state.monedas} monedaVL ={this.state.monedasvl}/>
                   
                    {/**Aqui iba las tablas obligaciones */}

                  </td>
                </tr>
                {/**Aqui Va las tablas obligaciones */}
                {/*<tr className="trTable">
                  <td className="tdTable" >
                  <TablaOtrasObligCanceladas otrasObligaciones={this.ActualizarObligacionesC()} codAlumno={this.state.codigoAlumno} codPrograma={this.state.codigoPrograma} dataConcepto={this.state.datos} conceptoVL={this.state.concepto} dataMoneda={this.state.monedas} monedaVL ={this.state.monedasvl}/>

                  </td>
                  <td className="tdTable" >
                  <TablaOtrasObligaciones otrasObligaciones={this.ActualizarObligaciones()} otrasObligacionesC={this.ActualizarObligacionesC()} codAlumno={this.state.codigoAlumno} codPrograma={this.state.codigoPrograma} dataConcepto={this.state.datos} conceptoVL={this.state.concepto} dataMoneda={this.state.monedas} monedaVL ={this.state.monedasvl}/>
                   
                  </td>
                    </tr>*/}
                {/**Aqui Va las tablas obligaciones */}
 {/***/}
              </table>


            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <DeudaTotal deuda={this.CalcularDeudaTotal()} />
            </div>
            
          </div>

        </div>
        <hr/>
        <footer>
          <div className="row center-xs centrar color">
            Proyecto SIGAP © 2019 v.1.3
          </div>
        </footer>

      </div>
      )
    } else {
      return <p className="text-center">Cargando estado de pagos de alumno</p>
    }
  }

ActualizarObligaciones=()=>{
  var BD_Estado = [
    { id:1, label: 'PENDIENTE' },
    { id:2, label: 'CANCELADO' }
  ];

  var BD_TipoObligacion = [
    { id: 1, label: 'REPITENCIA' },
    { id: 2, label: 'MULTA' }
  ];

  var valorTipoOb="";
    var valorConcepto="";
    var valorMoneda="";
    var valorEstado="";

    var ArrayActualizado=[];
    

    console.log("Tamaño Obligaciones");
      console.log(this.state.otrasObligaciones.length);
      for(let j=0;j<this.state.otrasObligaciones.length;j++){

            console.log("Tamaño TipoOblig");
            console.log(BD_TipoObligacion.length);
            for(let i=0;i<BD_TipoObligacion.length;i++){
              if(this.state.otrasObligaciones[j].id_tipo_oblig==BD_TipoObligacion[i].id){
                valorTipoOb=BD_TipoObligacion[i].label;
                console.log("valorTipoOb");
                console.log(valorTipoOb);
              }
            }

          console.log("Tamaño Concepto");
          console.log(this.state.datos.length);
          for(let i=0;i<this.state.datos.length;i++){
            if(this.state.otrasObligaciones[j].id_concepto==this.state.datos[i].idConcepto){
              valorConcepto=this.state.datos[i].concepto;
              console.log("valorConcepto");
              console.log(valorConcepto);
            }
          }

          console.log("Tamaño Moneda");
          console.log(this.state.monedas.length);
          for(let i=0;i<this.state.monedas.length;i++){
            if(this.state.otrasObligaciones[j].id_moneda==this.state.monedas[i].id_moneda){
              valorMoneda=this.state.monedas[i].moneda;
              console.log("valorMoneda");
              console.log(valorMoneda);
            }
          }

          console.log("Tamaño Estado");
          console.log(BD_Estado.length);
          for(let i=0;i<BD_Estado.length;i++){
            if(this.state.otrasObligaciones[j].id_estado==BD_Estado[i].id){
              valorEstado=BD_Estado[i].label;
              console.log("valorEstado");
              console.log(valorEstado);
            }
          }

          var e ={id: this.state.otrasObligaciones[j].id, 
                  val_tipo_oblig: valorTipoOb,
                  descripcion:this.state.otrasObligaciones[j].descripcion,
                  val_concepto:valorConcepto,  
                  val_moneda:valorMoneda,
                  importe:this.state.otrasObligaciones[j].importe,
                  val_estado:valorEstado};
                  ArrayActualizado.push(e);
      }
      console.log("ArrayActualizado");
      console.log(ArrayActualizado);
      return ArrayActualizado;
      
      
}



//EDITAMOS EL VALOR DEL COSTO
EditarCostoUno(){
      var costo ="costoUno";
      console.log("COSTOOOOOOO: "+document.getElementById(costo).value);
      document.getElementById(costo).disabled = false;
      document.getElementById(costo).focus();
}
EditarCostoDos(){
  var costo ="costoDos";
  console.log("COSTOOOOOOO: "+document.getElementById(costo).value);
  document.getElementById(costo).disabled = false;
  document.getElementById(costo).focus();
}
EditarCostoTres(){
  var costo ="costoTres";
  console.log("COSTOOOOOOO: "+document.getElementById(costo).value);
  document.getElementById(costo).disabled = false;
  document.getElementById(costo).focus();
}
MostrarImporte(codigoalumno,codigoprograma,codigoconcepto){
    
    fetch(CONFIG+'/search/codigoalumno/codigoprograma/codigoconcepto')
    .then((response)=>{
        return response.json()
    })
    .then((importe)=>{
        console.log(importe)
    })
  }
  RetornarCostoUno(){
    var costo = document.getElementById("costoUno").value;
    return costo;
  }
  RetornarCostoDos(){
    var costo = document.getElementById("costoUno").value;
    return costo;
  }
  RetornarCostoTres(){
    var costo = document.getElementById("costoUno").value;
    return costo;
  }

//GUARDAMOS EL COSTO EDITADO
GuardarCostoUno=(e)=>{
  var costo ="costoUno";
  var existeImporte = 0;
  document.getElementById(costo).disabled = true;
  console.log("COSTOOOOOOO: "+document.getElementById(costo).value);

  var codConcepto = 9;
  var importePago = document.getElementById(costo).value;

  this.setState({
    importeTabla1: importePago
    })

    
  console.log("BOOL1:"+this.state.bool1);

  if(this.state.bool1 == 0){
    this.AddCostoImporte(codConcepto,importePago);
  }else  if(this.state.importeTabla1>=0){
    this.UpdateCostoImporte(codConcepto,importePago);
  
    //this.setState({  bool1: 1  });
  }
    
  console.log("BOOL1:"+this.state.bool1);
        
    
    
}
GuardarCostoDos=(e)=>{
  var costo ="costoDos";
  
  document.getElementById(costo).disabled = true;
  console.log("COSTOOOOOOO: "+document.getElementById(costo).value);

  var codConcepto = 21;
  var importePago = document.getElementById(costo).value;

  this.setState({
    importeTabla2: importePago
    })

    console.log("BOOL1:"+this.state.bool2);
    if(this.state.bool2 == 0){
      this.AddCostoImporte(codConcepto,importePago);
    }else if(this.state.importeTabla2>=0){
    this.UpdateCostoImporte(codConcepto,importePago);
  
    //this.setState({  bool2: 1  });
  }
  
  console.log("BOOL1:"+this.state.bool2);
}

GuardarCostoTres=(e)=>{
  var costo ="costoTres";
  
  document.getElementById(costo).disabled = true;
  console.log("COSTOOOOOOO: "+document.getElementById(costo).value);

  var codConcepto = 117;
  var importePago = document.getElementById(costo).value;

  this.setState({
    importeTabla3: importePago
    })

    console.log("BOOL1:"+this.state.bool3);
    if(this.state.bool3 == 0){
      this.AddCostoImporte(codConcepto,importePago);
    }else if(this.state.importeTabla3>=0){
    this.UpdateCostoImporte(codConcepto,importePago);
  
    //this.setState({  bool3: 1  });
  }
  
  console.log("BOOL1:"+this.state.bool3);
}

CalcularDeudaTotal=(e)=>{

  var deudaUpg = this.state.importeTabla1 - this.CalcularImporteUno();
  var deudaEpg = this.state.importeTabla3 - this.CalcularImporteTres();
  var deudaDE = this.state.importeTabla2 - this.CalcularImporteDos();
  var deudaTotal = 0;

  console.log("DeudaUPGl:"+this.state.importeTabla1);
    console.log("DeudaUPG2:"+this.CalcularImporteUno);
  console.log("DeudaUPG:"+deudaUpg);
  console.log("DeudaEpg:"+deudaEpg);
  console.log("DeudaDE:"+deudaDE);

  if(deudaUpg>=0){
    deudaTotal = deudaTotal + deudaUpg;
  }
  if(deudaEpg>=0){
    deudaTotal = deudaTotal + deudaEpg;
  }
  if(deudaDE>=0){
    deudaTotal = deudaTotal + deudaDE;
  }

  return deudaTotal;
}

AddCostoImporte=(codConcepto,importePago)=>{
  fetch(CONFIG+'importealumno/add',
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      {
        "cod_alumno": this.state.codigoAlumno,
        "cod_programa": this.state.codigoPrograma,
        "cod_concepto": codConcepto,
        "importe": importePago
      }

    )
  }
  ).then((response) => {
    return response.json()
  })
}


UpdateCostoImporte=(codConcepto,importePago)=>{
  fetch(CONFIG+'importealumno/update',
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      {
        "cod_alumno": this.state.codigoAlumno,
        "cod_programa": this.state.codigoPrograma,
        "cod_concepto": codConcepto,
        "importe": importePago
      }

    )
  }
  ).then((response) => {
    return response.json()
  })
  this.setState({  bool1: 1  });
}

//PASAR LOS FILTROS A UNA TABLA
FuncionUno(holas){
    for(let j=0;j<this.state.pagoUno.length;j++){
      if(holas==this.state.pagoUno[j].idRec){
        if(this.state.pagoUno[j].check==true){
          this.state.pagoUno[j].check=false;
        }else{
          this.state.pagoUno[j].check=true;
        }
      }
    }
}
FuncionDos(holas){
    for(let j=0;j<this.state.pagoDos.length;j++){
      if(holas==this.state.pagoDos[j].idRec){
        if(this.state.pagoDos[j].check==true){
          this.state.pagoDos[j].check=false;
        }else{
          this.state.pagoDos[j].check=true;
        }
      }
    }
}
FuncionTres(holas){
    for(let j=0;j<this.state.pagoTres.length;j++){
      if(holas==this.state.pagoTres[j].idRec){
        if(this.state.pagoTres[j].check==true){
          this.state.pagoTres[j].check=false;
        }else{
          this.state.pagoTres[j].check=true;
        }
      }
    }
}
FuncionCuatro(holas){
    for(let j=0;j<this.state.pagoCuatro.length;j++){
      if(holas==this.state.pagoCuatro[j].idRec){
        if(this.state.pagoCuatro[j].check==true){
          this.state.pagoCuatro[j].check=false;
        }else{
          this.state.pagoCuatro[j].check=true;
        }
      }
    }
}

//LO USA WILL...
reporte_credito(idx,nombrenuevo,auxPagos){
     fetch(CONFIG+'beneficio/breporte_cr/' + nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
     .then((response)=>{
         return response.json();
     }).then((costos)=>{
         console.log("costos");
         console.log(costos);
         this.setState({costosP: costos})
     }) .catch(error=>{
          console.error(error)
      });
 }
//LO USA WILL...
 reporte_ciclo(nombrenuevo,auxPagos,idx){
      fetch(CONFIG+'beneficio/breporte_ci/'+ nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
      .then((response)=>{
          return response.json();
      }).then((costos)=>{
          console.log("costos");
          console.log(costos);
          this.setState({costosP: costos})
      }) .catch(error=>{
           console.error(error)
       });
  }

//CALCULAR LOS IMPORTES DE LAS TABLAS
CalcularImporteUno() {

  let pagos = this.state.pagoUno;
  let importe = 0;
  console.log("Pago Tabla 1");
  console.log(pagos)
  for (var indice in pagos) {
    if(pagos[indice].moneda=="108")
    importe = importe + pagos[indice].importe;
  }
  //this.setState({  sumaImporteUPG: importe  });
  return importe;
}
CalcularImporteDos() {

  let pagos = this.state.pagoDos;
  let importe = 0;
  console.log("Pago Tabla 2");
  console.log(pagos)
  for (var indice in pagos) {
    if(pagos[indice].moneda=="108")
    importe = importe + pagos[indice].importe;
  }
  //this.setState({  sumaImporteDE: importe  });
  return importe;
}
CalcularImporteTres() {

  let pagos = this.state.pagoTres;
  let importe = 0;
  console.log("Pago Tabla 3");
  console.log(pagos)
  for (var indice in pagos) {
    if(pagos[indice].moneda=="108")
    importe = importe + pagos[indice].importe;
  }
  //this.setState({  sumaImporteEPG: importe  });
  return importe;
}




//USADO PARA LA PAGINACION
  onChangePage(pageOfItems) {

   var total=[];
   var checkbox_selec=[];
   var checks=document.getElementsByClassName("checkbox1");
   var checks_normales=Array.from(checks);
   checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);

     }
   });

   for(let i=0;i<checkbox_selec.length;i++){
    var id=checkbox_selec[i];
    for(let j=0;j<this.state.pagocero.length;j++){
      if(this.state.pagocero[j].idRec==id){
          total.push(this.state.pagocero[j]);
      }
    }
 }
    // update state with new page of items
    this.setState({
      checkbox_:total,
      pageOfItems: pageOfItems });

     console.log(pageOfItems)
  }


}


class Paginacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {

    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    //var pages = _.range(startPage, endPage + 1);
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index + 28} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default ImportePagos;

