import { FieldArray } from "formik";

const parentChecked = (e, categoryRow, values, arrayHelpers) => {
  if (e.target.checked) {
    categoryRow.featured.map((item, index) => {
      if (
        categoryRow.featured.hasOwnProperty(index) &&
        !values.applicableItems.some(
          (applicableItem) => applicableItem.id === item.id
        )
      ) {
        arrayHelpers.push(item);
      }
    });
  } else {
    categoryRow.featured.map((item, index) => {
      if (categoryRow.featured.hasOwnProperty(index)) {
        const idx = values.applicableItems.findIndex(() => {
          return e.target.name === item.cat_name;
        });
        arrayHelpers.remove(idx);

        values.appliedTo = "selectedItems";
      }
    });
  }
};
const childChecked = (e, arrayHelpers, values, cateItem) => {
  if (e.target.checked) {
    arrayHelpers.push(cateItem);
  } else {
    const idx = values.applicableItems.findIndex(
      (applicableItem) => applicableItem.id === cateItem.id
    );
    arrayHelpers.remove(idx);
    values.appliedTo = "selectedItems";
  }
};
const FormikList = ({ values, arr, index, categoryRow, arrayHelpers }) => {
  return (
    <>
      <label className="text-sm flex  bg-gray-300 flex-row w-full px-3 py-2">
        <input
          name={categoryRow.name}
          type="checkbox"
          value={index}
          className="accent-cyan-400"
          checked={
            values.appliedTo === "allItems" ||
            arr.length === categoryRow.featured.length
              ? true
              : false
          }
          onChange={(e) => {
            parentChecked(e, categoryRow, values, arrayHelpers);
          }}
        />
        <span className="mx-4 text-base">{categoryRow.name}</span>
      </label>

      <FieldArray name="applicableItems">
        {(arrayHelpers) => {
          return (
            <div className="text-sm mx-4 flex flex-col w-full px-3 py-2">
              {categoryRow.featured.map((cateItem) => {
                return (
                  <label key={cateItem.id} className="my-2 text-xl">
                    <input
                      name="categoryItems"
                      type="checkbox"
                      value={cateItem.id}
                      className="accent-cyan-400"
                      checked={
                        values.appliedTo === "allItems" ||
                        values.applicableItems?.findIndex(
                          (applicableItem) => applicableItem.id === cateItem.id
                        ) !== -1
                      }
                      onChange={(e) => {
                        childChecked(e, arrayHelpers, values, cateItem);
                      }}
                    />
                    <span className="mx-2 text-base">{cateItem.name}</span>
                  </label>
                );
              })}
            </div>
          );
        }}
      </FieldArray>
    </>
  );
};

export default FormikList;
