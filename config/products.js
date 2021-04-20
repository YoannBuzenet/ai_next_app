// dev - test
const products = {
  en: {
    monthly: { stripeId: "price_1IeTgPJrGDLQuXVOUPbmsZrF" },
    yearly: { stripeId: "price_1IeTh0JrGDLQuXVOHhPd8Ids" },
    boost: { stripeId: "price_1IfOlwJrGDLQuXVOdprMmXuU" },
  },
  fr: {
    monthly: { stripeId: "price_1IeTgPJrGDLQuXVOUPbmsZrF" },
    yearly: { stripeId: "price_1IiCtAJrGDLQuXVOq9r93czZ" },
    boost: { stripeId: "price_1IiCsbJrGDLQuXVOXMsxkZ5o" },
  },
};
// prod
// const products = {
//   en: {
//     monthly: { stripeId: "price_1IeTh3JrGDLQuXVOEcDyieFq" },
//     yearly: { stripeId: "price_1IeTh3JrGDLQuXVOEcDyieFq" },
//     boost: { stripeId: "price_1IfOlhJrGDLQuXVOoIrf3YLi" },
//   },
//   fr: {
//     monthly: { stripeId: "price_1IiCppJrGDLQuXVO022Tle8g" },
//     yearly: { stripeId: "price_1IiCpRJrGDLQuXVOY0BxZTwK" },
//     boost: { stripeId: "price_1IiCnVJrGDLQuXVOyMcL1oky" },
//   },
// };

module.exports = { products };
