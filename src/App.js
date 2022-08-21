import { FaSearch } from "react-icons/fa";
import FormikList from "./components/FormikList";
import { Formik, Field, Form, FieldArray } from "formik";
const categories = [
  {
    name: "Bracelets",
    arr: [
      { id: 14865, name: "Jasinth Bracelet", cat_name: "Bracelets" },
      { id: 14867, name: "Inspire Bracelet", cat_name: "Bracelets" },
      { id: 14870, name: "Jasinthe Bracelet", cat_name: "Bracelets" },
    ],
  },

  {
    name: " ",
    arr: [
      { id: 14864, name: "Recurring Item", cat_name: " " },
      {
        id: 14868,
        name: "Recurring Item with questions",
        cat_name: " ",
      },
      {
        id: 14869,
        name: "Zero amount item with questions",
        cat_name: " ",
      },
      {
        id: 14872,
        name: "Normal item with quesFtions",
        cat_name: " ",
      },
      { id: 14873, name: "normal item", cat_name: " " },
    ],
  },
];
function App() {
  let arr = [];
  return (
    <div className="max-w-3xl mx-auto py-2 shadow-md">
      <Formik
        initialValues={{
          taxName: "",
          categories,
          applicableItems: [],
          taxRate: 5,
          appliedTo: "selectedItems",
        }}
        onSubmit={async (values) => {
          const cartItems = {
            taxName: values.taxName,
            applicableItems: values.applicableItems.map((item) => item.id),
            taxRate: values.taxRate,
            appliedTo: values.appliedTo,
          };

          alert(JSON.stringify(cartItems, null, 2));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <FieldArray name="applicableItems">
              {(arrayHelpers) => {
                return (
                  <>
                    <div className="my-8 px-8 max-w-xl">
                      <h1 className="block text-2xl capitalize">add tax</h1>
                      <div className="grid grid-cols-3 my-4">
                        <Field
                          type={"text"}
                          placeholder="Tax Name"
                          name="taxName"
                          className="block w-full h-10 col-span-2 py-2 px-4 shadow-sm sm:text-sm focus:ring-grape-500 focus:border-grape-500 border border-gray-300 rounded-md"
                        />
                        <div className="relative">
                          <input
                            name={"taxRate"}
                            type={"number"}
                            onChange={(v) => {
                              setFieldValue("taxRate", v.target.value);
                            }}
                            defaultValue={values.taxRate}
                            placeholder="Tax Rate"
                            min={0}
                            className="block w-full h-10 mx-4 py-2 px-4 col-span-1 shadow-sm sm:text-sm focus:ring-gray-500 border border-gray-300 rounded-md"
                          />
                          <span className="absolute  text-sm right-0 top-2 -mr-3">
                            %
                          </span>
                        </div>
                      </div>

                      <div className="flex-col px-4  text-sm">
                        <div className="flex">
                          <label htmlFor="allItems" className="text-lg">
                            <Field
                              type="radio"
                              name="appliedTo"
                              value={"allItems"}
                              onChange={(v) => {
                                setFieldValue("appliedTo", v.target.value);
                                values.categories.forEach((item) =>
                                  item.arr.map((i) => {
                                    // arrayHelpers.push(i);
                                    if (
                                      !values.applicableItems.some(
                                        (applicableItem) =>
                                          applicableItem.id === i.id
                                      )
                                    ) {
                                      arrayHelpers.push(i);
                                    }
                                  })
                                );
                              }}
                              className="accent-orange-500  rounded-full w-6 h-6 "
                            />
                            <span className="ml-2">
                              Apply to all items in collection
                            </span>
                          </label>
                        </div>
                        <div className="flex">
                          <label htmlFor="selectedItems" className="text-lg">
                            <Field
                              type="radio"
                              name="appliedTo"
                              value={"selectedItems"}
                              onChange={(v) => {
                                setFieldValue("appliedTo", v.target.value);
                              }}
                              className="accent-orange-500 rounded-full w-6 h-6 "
                            />
                            <span className="ml-2">
                              Apply to selected items
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-t border-gray-200 pt-4">
                      <div className="px-8 relative flex items-center">
                        <span className="text-gray-300 p-0.5 my-2 px-2 absolute left-8">
                          <FaSearch className="h-3 w-3" />
                        </span>
                        <Field
                          type={"text"}
                          name="search-key"
                          className="block w-1/2 h-10 col-span-2 py-2 px-6 shadow-sm sm:text-sm focus:ring-grape-500 focus:border-grape-500 border border-gray-300 rounded-md"
                          placeholder="search for item"
                        />
                      </div>
                    </div>
                    {values.categories.map((categoryRow, index) => {
                      // const arr = values.applicableItems.filter(
                      arr = values.applicableItems.filter(
                        (category) => category.cat_name === categoryRow.name
                      );

                      return (
                        <div key={index} className="mt-4  w-full">
                          <FormikList
                            values={values}
                            arr={arr}
                            categoryRow={categoryRow}
                            index={index}
                            arrayHelpers={arrayHelpers}
                          />
                        </div>
                      );
                    })}
                  </>
                );
              }}
            </FieldArray>
            {/* <FormikList values={values} /> */}
            <span className="flex my-8 mx-4 justify-end">
              <button
                className="px-4 py-4 text-white rounded-sm bg-orange-500 text-lg capitalize"
                type="submit"
              >
                Apply tax to {`${values?.applicableItems?.length}`} item's
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
