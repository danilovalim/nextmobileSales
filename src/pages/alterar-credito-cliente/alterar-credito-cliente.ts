import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the AlterarCreditoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alterar-credito-cliente',
  templateUrl: 'alterar-credito-cliente.html',
})
export class AlterarCreditoClientePage {

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController,
  ){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarCreditoClientePage');
  }

  alterarCredito() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar alterações',
      subTitle: 'Confirma as alterações efetuadas?',
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }

  updateCredito(cli) {
    let cliKey = cli.key;
    this.db.list('clientes').update(cliKey, cli)
    .catch((error: any) => {
      console.error('Deu erro: ', error);
    });
  }

}
