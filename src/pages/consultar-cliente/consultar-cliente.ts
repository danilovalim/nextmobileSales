import { Observable } from 'rxjs/Observable';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from "angularfire2/database";
import { Cliente } from './../../app/model';

@IonicPage()
@Component({
  selector: 'page-consultar-cliente',
  templateUrl: 'consultar-cliente.html',
})

export class ConsultarClientePage {
  cliente: Observable<any>;

  dbClientes: Observable<any>;

  constructor(
    private provider: ClienteProvider,
    public db: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController,
  ){

    this.cliente = this.provider.getAll();
  }

  clientes: [
    {
      nome: "AÇONOBRE COM. VAREJ. FERRAG. LTDA",
      codigoCliente: "10120378",
      end_rua: "R DAS PEDRAS",
      end_numero: "23",
      end_bairro: "",
      end_cidade: "IPATINGA"
      end_complemento: "",
      end_uf: "SP",
    }
  ];

  ionViewWillEnter() {
    this.dbClientes = this.getAllClientes();
    console.log('Em dbClientes: ', this.dbClientes);
    console.log( JSON.stringify(this.dbClientes) );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultarClientePage');
  }

  // Função para buscar os clientes
  getAllClientes() {
    console.log('Função getAllClientes');
    return this.db.list('clientes')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

}
