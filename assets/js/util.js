import React from 'react';
class Util extends React.Component {
    constructor() {
        super()

    }
   
      restInfo(props) {
        let {restaurant} = props;
        console.log(restaurant["name"]);
        console.log("restinfo");
        localStorage.setItem('restaurant_name', restaurant["name"]);
        console.log(localStorage);
        this.props.setTimeOut(5000);
      
      }
}