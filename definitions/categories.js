const categoriesDefinition = {
  1: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.id1.label",
          defaultMessage: "Describe shortly your product",
        },
        placeholder: {
          id: "categories.id1.placeholder",
          defaultMessage:
            "Example : Data analytics software for small and medium businesses.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 1,
    name: {
      id: "categories.id1.categorylabel",
      defaultMessage: "Product Description",
    },
  },
  2: {
    inputs: [
      {
        name: "value1",
        maxLengthInput: 100,
        label: {
          id: "categories.id2.label",
          defaultMessage: "What is your company/product name ?",
        },
        placeholder: {
          id: "categories.id2.placeholder",
          defaultMessage: "Example : Uber",
        },
        inputType: "small",
      },
      {
        name: "value2",
        maxLengthInput: 100,
        label: {
          id: "categories.id2.label2",
          defaultMessage: "What is your company about ?",
        },
        placeholder: {
          id: "categories.id2.placeholder2",
          defaultMessage:
            "Example : We connect drivers to people who wants to go somewhere.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 2,
    name: {
      id: "categories.id2.categorylabel",
      defaultMessage: "Value Proposition",
    },
  },
  3: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.id3.label",
          defaultMessage: "What is this blog ticket about ?",
        },
        placeholder: {
          id: "categories.id3.placeholder",
          defaultMessage: "Example : Hiking in Netherlands",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 3,
    name: { id: "categories.id3.categorylabel", defaultMessage: "Blog Title" },
  },
  4: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.id4.label",
          defaultMessage: "What is your caption about ?",
        },
        placeholder: {
          id: "categories.id4.placeholder",
          defaultMessage:
            "Example : Went to the beach yesterday - it was so beautiful.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 4,
    name: {
      id: "categories.id4.categorylabel",
      defaultMessage: "Instagram Caption",
    },
  },
  5: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.id5.label",
          defaultMessage: "What is your blog about ?",
        },
        placeholder: {
          id: "categories.id5.placeholder",
          defaultMessage:
            "Example : My blog is about cooking specific pizzas !",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 5,
    name: { id: "categories.id5.categorylabel", defaultMessage: "Blog Intro" },
  },
};

const listOfCategories = [
  {
    name: {
      id: "categories.id1.categorylabel",
      defaultMessage: "Product Description",
    },
    categoryId: 1,
  },
  {
    name: {
      id: "categories.id2.categorylabel",
      defaultMessage: "Value Proposition",
    },
    categoryId: 2,
  },
  {
    name: { id: "categories.id3.categorylabel", defaultMessage: "Blog Title" },
    categoryId: 3,
  },
  {
    name: {
      id: "categories.id4.categorylabel",
      defaultMessage: "Instagram Caption",
    },
    categoryId: 4,
  },
  {
    name: { id: "categories.id5.categorylabel", defaultMessage: "Blog Intro" },
    categoryId: 5,
  },
];

module.exports = { categoriesDefinition, listOfCategories };
