const checkedItems = (applicableItems, categoryName) => {
  return applicableItems.filter((item) => item.cat_name === categoryName);
};
const isInTheList = (applicableItems, value) => {
  return applicableItems.some((applicableItem) => applicableItem.id === value);
};
const getIndex = (applicableItems, value) => {
  return applicableItems.findIndex(
    (applicableItem) => applicableItem.id === value
  );
};

export { checkedItems, isInTheList, getIndex };
