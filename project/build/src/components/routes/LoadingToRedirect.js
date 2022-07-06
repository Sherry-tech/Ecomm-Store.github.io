import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";



const LoadingToRedirect = () => {

    const [count,setCount] = useState(5);
    let history = useHistory();

    useEffect(()=> {

        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);//ms
        //redirect once count == 0
        count === 0 && history.push("/")
        //cleanup
        return () => clearInterval(interval);

    }, [count,history])

    return(
        <div className="container justify-content-center p-5 text-container">

        <p>Redirecting you in {count} seconds.</p>

        </div>
    );

};

export default LoadingToRedirect;