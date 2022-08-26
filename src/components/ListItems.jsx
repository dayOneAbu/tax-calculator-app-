import { FieldArray } from "formik";
import { Fragment } from "react";
import { getIndex, isInTheList } from "../helpers";
import CheckBoxInput from "./CheckBoxInput";

function ListItems({ categoryRow, arrayHelpers, values }) {
  return (
    <>
      <FieldArray name="applicableItems">
        {() => {
          return (
            <div className="text-sm mx-8 flex flex-col w-full h-full px-3 py-2">
              {categoryRow.featured.map((item) => {
                return (
                  <div className="my-2 mx-4" key={item.id}>
                    <CheckBoxInput
                      name="categoryItems"
                      type={"checkbox"}
                      value={item.id}
                      label={item.name}
                      checked={
                        values.appliedTo === "allItems" ||
                        isInTheList(values.applicableItems, item.id)
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!isInTheList(values.applicableItems, item.id)) {
                            arrayHelpers.push(item);
                          }
                        } else {
                          const {
                            form: { setFieldValue },
                          } = arrayHelpers;
                          const idx = getIndex(values.applicableItems, item.id);
                          arrayHelpers.remove(idx);
                          setFieldValue("appliedTo", "selectedItems");
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      </FieldArray>
    </>
  );
}

export default ListItems;
