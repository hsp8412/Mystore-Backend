function calculateTotal(orderProducts) {
  let total = 0;
  for (let product of orderProducts) {
    total += product.price * product.numberToPurchase;
  }
  return total;
}

exports.calculateTotal = calculateTotal;
