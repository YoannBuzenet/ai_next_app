let products;

if (process.env.NODE_ENV !== "production") {
  products = {
    monthly: { stripeId: "price_1IeTgPJrGDLQuXVOUPbmsZrF" },
    yearly: { stripeId: "price_1IeTh0JrGDLQuXVOHhPd8Ids" },
  };
} else {
  products = {
    monthly: { stripeId: "price_1IeTh3JrGDLQuXVOEcDyieFq" },
    yearly: { stripeId: "price_1IeTh3JrGDLQuXVOEcDyieFq" },
  };
}

module.exports = { products };
