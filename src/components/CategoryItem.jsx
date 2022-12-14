import { Fragment } from "react";
import { checkedItems, getIndex, isInTheList } from "../helpers";
import CheckBoxInput from "./CheckBoxInput";
import ListItems from "./ListItems";

function CategoryItem({ arrayHelpers, values }) {
  return (
    <div>
      {values.categories.map((categoryRow, index) => {
        return (
          <Fragment key={index}>
            <div className="mt-4 flex flex-row mx-8 h-12 bg-gray-200 rounded items-center px-4 ">
              <CheckBoxInput
                name={categoryRow.name}
                type={"checkbox"}
                value={categoryRow.name}
                label={categoryRow.name}
                checked={
                  values.appliedTo === "allItems" ||
                  checkedItems(values.applicableItems, categoryRow.name)
                    .length === categoryRow.featured.length
                }
                onChange={(e) => {
                  const products = [...categoryRow.featured];
                  if (e.target.checked) {
                    return products.forEach((item) => {
                      if (!isInTheList(values.applicableItems, item.id)) {
                        arrayHelpers.push(item);
                      }
                    });
                  } else {
                    const {
                      form: { setValues },
                    } = arrayHelpers;

                    setValues({
                      taxName: values.taxName,
                      categories: values.categories,
                      taxRate: values.taxRate,
                      appliedTo: "selectedItems",
                      applicableItems: values.applicableItems.filter(
                        (item) => item.cat_name !== e.target.name
                      ),
                    });
                  }
                }}
              />
            </div>
            <ListItems
              arrayHelpers={arrayHelpers}
              values={values}
              categoryRow={categoryRow}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
export default CategoryItem;
