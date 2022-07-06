import React from "react";
//when it is default export we do not use {} destructure. 
//we only destructure when the export is named
import Typewriter from 'typewriter-effect'


const Jumbotron = ({ text }) => (

    <Typewriter 
      options = {{
        strings : text,
        autoStart: true,
        loop: true,
      }}
    />

);

export default Jumbotron;