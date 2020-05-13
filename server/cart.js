const log = require('./log');

const add = (cart, req) => {
  cart.contents.push(req.body);
	log.info(`ADD ${req.body.id_product}. ${req.body.product_name}`);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  log.info(`CHANGE ${find.id_product}. ${find.product_name}`);
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
	// console.log(cart);
	const find = cart.contents.find(el => el.id_product === +req.params.id);
	find.quantity -= req.body.quantity;
	if(find.quantity === 0)
		cart.contents.splice(cart.contents.indexOf(find),1);
	log.info(`DELETE ${find.id_product}. ${find.product_name}`);
	return JSON.stringify(cart, null, 4);

};

module.exports = {
  add,
  change,
	del
};
