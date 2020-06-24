import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal"

function CartSummary({ products, handleCheckout, success }) {
    const [cartAmount, setCartAmount] = React.useState(0)
    const [stripeAmount, setStripAmount] = React.useState(0)
    const [isCartEmpty, setIsCartEmpty] = React.useState(false)

    React.useEffect(() => {
        const { cartTotal, stripeTotal } = calculateCartTotal
            (products)
        setCartAmount(cartTotal)
        setStripAmount(stripeTotal)
        setIsCartEmpty(products.length === 0);
    }, [products])

  return (
    <>
      <Divider />
          <Segment clearing size="large">
              <strong>Sub total:</strong> ${cartAmount}
              <StripeCheckout
                  name="Thrive"
                  amount={stripeAmount}
                  image={products.length > 0 ? products[0].product.mediaUrl : ""}
                  currency="USD"
                  shippingAddress={true}
                  billingAddress={true}
                  zipCode={true}
                  token={handleCheckout}
                  triggerEvent="onClick"
                  stripeKey="pk_test_51GxG0eBogjfaSD3kEslnxlal2wOK66s0dRfDbWVXqH1Q6viudNnNzA67jzJ5L3RyHbYn2JTLDYqRmrgw5P8noEEm00eJK7fa0V"
              >
        <Button icon="cart"
                  disabled={isCartEmpty || success}
                      color="black" floated="right" content="Checkout" />
              </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
