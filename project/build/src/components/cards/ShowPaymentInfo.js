import React from "react";

const ShowPaymentInfo = ({order, showStatus = true}) => (

    <div>
        <p>
            <span>Order Id: {order.paymentIntent.id}</span> {" / "}
             {/* toLocaleString native js function to format amount */}
            <span>
                Amount:{" / "} 
                {(order.paymentIntent.amount /= 100).toLocaleString("en-us", {
                 style: "currency",
                 currency: "USD",
             })}
            </span> {" / "}

            <span>currency: {order.paymentIntent.currency.toUpperCase()}</span>{" / "}
            <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
            <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" / "}
            <span>Orderd on: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{" / "}
            <br />
            {showStatus && (
                <span className="badge bg-primary text-white">
                    STATUS: {order.orderStatus}
                </span>
            )}

        </p>
    </div>

);

export default ShowPaymentInfo;