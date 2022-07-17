import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";

import axois from "axios";
import { removeFromCart } from "../redux/apiCalls";

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const cruse = useSelector((state) => state.user.currentUser);
  const abcde = useSelector((state) => state.cart);
  if (cruse === null) {
    navigate("/");
  }
  const onToken = (token) => {
    setStripeToken(token);
  };

  // console.log(stripeToken);


  useEffect(() => {
    const makeRequest = async () => {
      try {

        // const res = await userRequest.post("/checkout/payment", {
        //   tokenId: stripeToken.id,
        //   amount: cart.total * 100,
        // });

        const neworder = {
          userId:cruse._id,
          products:abcde.products,
          amount:abcde.total,
          address:stripeToken.card.address_line1,
        }

        console.log(neworder);
        const res = await userRequest.post(`/orders/create/${cruse._id}`, neworder);
        // navigate("/success", {
        //   stripeData: res.data,
        //   products: cartInfo,
        // });

        navigate("/success");

      } catch { }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);


  const handleDeletefromCart = (e) => {
    console.log(e);
    // let resdata = JSON.parse(JSON.stringify(cruse.products));
    let resdata = JSON.parse(JSON.stringify(abcde.products));
    console.log("befor", resdata)
    let total = 0;
    
    let delarray = resdata.filter((tar) => {
      if(tar.productId!==e){
        total+=(tar.productprice*tar.quantity);
      }
      return tar.productId != e;
    })
    const newuser = {
      ...cruse,
      products: delarray,
    };
    removeFromCart(dispatch, newuser, delarray, total);
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>
            <Link to="/">
              <Button>
                CONTINUE SHOPPING
              </Button>
            </Link>
          </TopButton>
          {/* <TopTexts> */}
          {/* <TopText>Shopping Bag(2)</TopText> */}
          {/* <TopText>Your Wishlist (0)</TopText> */}
          {/* </TopTexts> */}
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart?.products?.map((product,idx) => (

              <Product key={idx}>
                <ProductDetail>
                  <Image src={product.prodimg} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.ProdName}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.productId}
                    </ProductId>
                    {/* <ProductColor color={product.color} /> */}
                    {/* <ProductSize> */}
                    {/* <b>Size:</b> {product.size} */}
                    {/* </ProductSize> */}
                    <ProductSize>
                      <b>Quantity:</b> {product.quantity}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Button onClick={(e) => handleDeletefromCart(product.productId)}>
                      Remove Product
                    </Button>
                    {/* <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove /> */}
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹ {product.prodprice}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {abcde.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {abcde.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Bech De."
              image="https://old.iitbhu.ac.in/icmc2018/apm/images/IITBHU-Logo.jpg"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={"pk_test_51LKKRmSHKZOH1aBMDG8mpvGphrDZ0RfmNRlT5OQC7SITNlSbGEx0iAmzpRrfN79fxbmGlgg5GZDoPDQaWY3dQtnT00TYWGnSqk"}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;