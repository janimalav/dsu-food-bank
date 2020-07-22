/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 *
 * Formatting the response objects for the front-end models
 */

const formatProducts = (products) => {
  return products.map((product) => {
    return {
      id: product.ItemId,
      name: product.ItemName,
      description: product.ItemDescription,
      limit: product.ItemLimit,
      availableQuantity: product.AvailableQuantity,
      imagePath: product.ItemImagePath,
      category: {
        id: product.CategoryId,
        name: product.CategoryName,
      },
    };
  });
};

const formatOrderDetail = (Orders) => {
  const items = Orders.map((Order) => {
    return {
      name: Order.ItemName,
      quantity: Order.ItemQuantity,
      CategoryName: Order.CategoryName,
      ItemId: Order.ItemId,
    };
  });
  return {
    orderId: Orders[0].OrderId,
    item: items,
    OrderDate: Orders[0].OrderDate,
    DeliveredDate: Orders[0].DeliveredDate,
    status: Orders[0].status,
    PickUpSlot: Orders[0].PickUpSlot,
  };
};

const formatCatgories = (categories) => {
  return categories.map((category) => {
    return {
      id: category.CategoryId,
      name: category.CategoryName,
    };
  });
};

module.exports = { formatProducts, formatCatgories, formatOrderDetail };
