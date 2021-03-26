export const categoriesDefinition = {
  1: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: "Describe shortly your product",
        placeholder:
          "Example : Data analytics software for small and medium businesses.",
        inputType: "textarea",
      },
    ],
    categoryId: 1,
    name: "Product Description",
  },
  2: {
    inputs: [
      {
        name: "value1",
        maxLengthInput: 100,
        label: "What is your company/product name ?",
        placeholder: "Example : Uber",
        inputType: "small",
      },
      {
        name: "value2",
        maxLengthInput: 100,
        label: "What is your company about ?",
        placeholder:
          "Example : We connect drivers to people who wants to go somewhere.",
        inputType: "textarea",
      },
    ],
    categoryId: 2,
    name: "Value Proposition",
  },
  3: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: "What is this blog ticket about ?",
        placeholder: "Example : Hiking in Netherlands",
        inputType: "textarea",
      },
    ],
    categoryId: 3,
    name: "Blog Title",
  },
  4: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: "What is your caption about ?",
        placeholder:
          "Example : Went to the beach yesterday - it was so beautiful.",
        inputType: "textarea",
      },
    ],
    categoryId: 4,
    name: "Instagram Caption",
  },
  5: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: "What is your blog about ?",
        placeholder: "Example : My blog is about cooking specific pizzas !",
        inputType: "textarea",
      },
    ],
    categoryId: 5,
    name: "Blog Intro",
  },
};
