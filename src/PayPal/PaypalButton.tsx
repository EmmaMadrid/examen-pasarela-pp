import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonInterface {
    total: string;
    products: Array<{
        Producto: string;
        Precio: string;
    }>;
}

const PayPalButton: React.FC<PaypalButtonInterface> = (props) => {
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: 'Compra en Panaderia Pan comido',
                            amount: {
                                value: props.total,
                                currency_code: 'USD', // Cambiado a pesos mexicanos (MXN)
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD', // Cambiado a pesos mexicanos (MXN)
                                        value: props.total,
                                    },
                                },
                            },
                            items: props.products.map((product) => ({
                                name: product.Producto,
                                unit_amount: {
                                    currency_code: 'USD', // Cambiado a pesos mexicanos (MXN)
                                    value: product.Precio,
                                },
                                quantity: 1,
                            })),
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order?.capture();
                console.log("order", order);
            }}
        />
    );
};

export default PayPalButton;
