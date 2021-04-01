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
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Marketing",
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
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Marketing",
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
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Blog",
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
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Instagram",
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
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Blog",
  },
  6: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.id6.labelInput1",
          defaultMessage: "Product Description",
        },
        placeholder: {
          id: "categories.id6.placeholder",
          defaultMessage: "What does your product do ?",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 6,
    name: {
      id: "categories.id6.categorylabel",
      defaultMessage: "Facebook Ads headline",
    },
    description: {
      id: "categories.id6.placeholder",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Marketing",
  },
};

const listOfCategories = [
  {
    name: {
      id: "categories.id1.categorylabel",
      defaultMessage: "Product Description",
    },
    description: {
      id: "categories.id1.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Marketing",
    urlLogo: "",
    categoryId: 1,
  },
  {
    name: {
      id: "categories.id2.categorylabel",
      defaultMessage: "Value Proposition",
    },
    description: {
      id: "categories.id2.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Marketing",
    urlLogo: "",
    categoryId: 2,
  },
  {
    name: { id: "categories.id3.categorylabel", defaultMessage: "Blog Title" },
    description: {
      id: "categories.id3.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Blog",
    urlLogo: "",
    categoryId: 3,
  },
  {
    name: {
      id: "categories.id4.categorylabel",
      defaultMessage: "Instagram Caption",
    },
    description: {
      id: "categories.id4.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Instagram",
    urlLogo: "",
    categoryId: 4,
  },
  {
    name: { id: "categories.id5.categorylabel", defaultMessage: "Blog Intro" },
    description: {
      id: "categories.id5.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Blog",
    urlLogo: "",
    categoryId: 5,
  },
  {
    name: {
      id: "categories.id6.categorylabel",
      defaultMessage: "Facebook Ads headline",
    },
    description: {
      id: "categories.id6.categoryDescription",
      defaultMessage: "",
    },
    parentCategory: "Marketing",
    urlLogo: "",
    categoryId: 6,
  },
];

module.exports = { categoriesDefinition, listOfCategories };
