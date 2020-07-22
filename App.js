import React, { Component } from 'react';
import payroll from './src/components/payroll';
import './src/components/webtool';
import styles from './src/css/style.css';

class App extends Component {
   render() {

      return (
         <div className={"container"}>
            <h1 className={"container__title"}>Kalkulator wynagrodzenia</h1>
            <div id="inputSelections" className={"container__selection"}>

               <label id="Lab0" htmlFor="brutto">Brutto</label><br></br>
               <input id="brutto" placeholder="brutto" type="number"></input>
               <br></br>

               <input id="pracNam" type="checkbox"></input>
               <label id="Lab1" htmlFor="pracNam">Praca w miejscu zamieszkania</label><br></br>

               <input id="do26l" type="checkbox"></input>
               <label id="Lab2" htmlFor="do26l">Ukończony 26 rok życia</label><br></br>

               <input id="ppkOn" type="checkbox"></input>
               <label id="Lab3" htmlFor="ppkOn">Należy do PPK</label><br></br>
            </div>
            <div className={"container__output"}>

               <label id="Lab4" htmlFor="netto">Netto</label><br></br>
               <input readOnly id="netto" placeholder="netto" type="number"></input><br></br>
               <div className={"container__outputValues"}>
                  <label className={"container__outputValues--input"} id="Lab4" htmlFor="Podatek">Podatek</label>
                  <input  readOnly className={"container__outputValues--input"} id="Podatek" type="number"></input>

                  <label className={"container__outputValues--input"} id="Lab5" htmlFor="sklSpoleczne">Składki społeczne</label>
                  <input readOnly className={"container__outputValues--input"} id="sklSpoleczne" type="number"></input>

                  <label className={"container__outputValues--input"} id="Lab6" htmlFor="sklZdr">Składka zdrowotna</label>
                  <input readOnly className={"container__outputValues--input"} id="sklZdr" type="number"></input>
               </div>
            </div>
         </div>
      );
   }
}
export default App;