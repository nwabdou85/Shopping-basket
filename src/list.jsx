import React, {Component} from 'react';
import './App.css';






export default class List extends Component {
    constructor(props){
    	super(props);
    	this.state={};
    	this.lists = this.lists.bind(this);
    	this.total = this.total.bind(this);
    }


total(name, price, number){
   console.log('woww', name, price, number);
      if (name !== 'Papayas') {
          return price *number;
      } else {

        if (number < 3) {
           return price *number;
        } else {
          let numberOfpapayas = number;
          let num = ~~( numberOfpapayas/ 3);
          let rest = numberOfpapayas - (num*3);
          return price * (num*2 + rest);

        }
      }
}


 lists(){
 	return this.props.informations.map((item,index) => {return <p key={index}>
	 		<span>{item.name} </span>
	 		<span>{item.price}E/item</span>
	 		<span>*{item.number}</span>
	 		<span>{this.total(item.name,item.price, item.number)}Euro</span>
 		</p>})
 }



	render(){

	return (
           <div>
            {this.lists()}
           </div>
		)
	}
}