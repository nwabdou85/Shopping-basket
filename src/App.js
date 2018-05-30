import React, { Component } from 'react';
import './App.css';
import data from './products.js';
import List from './list.jsx';


class App extends Component {
   constructor(props){
    super(props);
    this.state={
      Items:[],
      name:'',
      price:0,
    };
    this.renderOption = this.renderOption.bind(this);
    this.total = this.total.bind(this);
    this.details = this.details.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
   }
   


   renderOption(){
    return data.map((product,index) => {
         return <option value={index} key={product.id} data-price={product.price} data-name={product.name} >{product.name}</option>
    })
   }
    


   total(){
    if (!!this.state.Items.length) {
          let somme = 0;
         for (var i = 0; i < this.state.Items.length; i++) {
              if (this.state.Items[i].name !== 'Papayas') {
                  somme += this.state.Items[i].price * this.state.Items[i].number;
              } else {

                if (this.state.Items[i].number < 3) {
                  somme += this.state.Items[i].price * this.state.Items[i].number;
                } else {
                  let numberOfpapayas = this.state.Items[i].number;
                  let num = ~~( numberOfpapayas/ 3);
                  let rest = numberOfpapayas - (num*3);
                  somme += this.state.Items[i].price * (num*2 + rest);

                };
              };
         };
      return somme;
    }else {
      //in the case of empty basket, return 0 euro
      return 0;
    }
   }


   details(){
    if (!!this.state.Items.length) {
         return  <List informations = {this.state.Items} />
    } else {
       return "Please, add one or more porducts";
    }
   }

 

 handleSelectChange = (event) => {
    let SingleName =  event.target[event.target.value].getAttribute('data-name');
    let SinglePrice = event.target[event.target.value].getAttribute('data-price');
    this.setState({
      name:  SingleName ,
      price: SinglePrice,
    })
  }



 handleAdd(){
    let name = !!this.state.name?this.state.name:'Apples';
    let price  = !!this.state.price ? this.state.price:0.25;

    let obj = {name:name, price:price, number:1}

    // insert products
    if (!!this.state.Items.length) {
       // if is not empty, I should update the state
         

         let result = this.state.Items.filter(function( obj, i ) {
            return obj.name === name;
          });
           
         // find the index of product
         let index;
         for (var i = 0; i < this.state.Items.length; i++) {

              if (this.state.Items[i].name === name) { index = i};
         };
          
        if (!!result.length) {
             // update the product with the index above
             const Items = this.state.Items;
              Items[index].number = Items[index].number+ 1;
              this.setState({
                  Items,
              });

          } else {
            //insert the new product
              this.setState({
                 Items: [...this.state.Items, obj]
              })
          };

    } else {
      //if the Items is empty, insert the selected  product without verification 
      this.setState({
         Items: [...this.state.Items, obj]
      })
    };
  }




handleRemove(){
    let name = !!this.state.name?this.state.name:'Apples';

  if (!!this.state.Items.length) {
      let result = this.state.Items.filter(function( obj, i ) {
            return obj.name === name;
          });

      if (!!result.length) {
         // verify that the product is selected 
         let number = result[0].number;
          
          // if selected, find the index of it  
          let index;
             for (var i = 0; i < this.state.Items.length; i++) {
                  if (this.state.Items[i].name === name) { index = i};
             };
         
         // if the product selected more than one , decrease the number, else remove it
         if (number > 1) {
          // decrease the number
              const Items = this.state.Items;
              Items[index].number = Items[index].number - 1;
              this.setState({
                  Items,
              });

         } else {
            // if number === 0, remove the object from array
            this.setState((prevState) => ({
              Items: [...prevState.Items.slice(0,index), ...prevState.Items.slice(index+1)]
            }))
         };
      };
  }

}






  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shopping basket</h1>
          <h3>Black friday: three Papayas for the price of two</h3>
        </header>
        <div className="form">
          <select onClick={this.handleSelectChange}>
             {this.renderOption()}
          </select>
          <input type="submit" value="+" onClick={this.handleAdd} />
          <input type="submit" value="-" onClick={this.handleRemove} />
        </div>

        <div className="bill">
            <p>Bill</p>
             <div className="detail">
               {this.details()}
             </div>
            <h3>Total : {this.total()} euro</h3>
        </div>
      </div>
    );
  }
}

export default App;
