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
    urlIcon: "/icons/image_28.png",
    name: {
      id: "categories.id1.categorylabel",
      defaultMessage: "Product Description",
    },
    description: {
      id: "categories.id1.description",
      defaultMessage:
        "Create a description that will present your product with ease.",
    },
    parentCategory: "Marketing",
  },
  2: {
    inputs: [
      {
        name: "value1",
        maxLengthInput: 30,
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
        maxLengthInput: 70,
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
    urlIcon: "/icons/image_28.png",
    name: {
      id: "categories.id2.categorylabel",
      defaultMessage: "Value Proposition",
    },
    description: {
      id: "categories.id2.description",
      defaultMessage: "Offer a rich and relevant presentation of your service.",
    },
    parentCategory: "Brand",
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
    urlIcon: "/icons/image_7.png",
    name: { id: "categories.id3.categorylabel", defaultMessage: "Blog Title" },
    description: {
      id: "categories.id3.description",
      defaultMessage:
        "Create a blog title that will summarize the key idea of your text.",
    },
    parentCategory: "Blog",
  },
  4: {
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
    categoryId: 4,
    urlIcon: "/icons/image_7.png",
    name: { id: "categories.id5.categorylabel", defaultMessage: "Blog Intro" },
    description: {
      id: "categories.id5.description",
      defaultMessage: "Introduce your blog with the relevant outlines.",
    },
    parentCategory: "Blog",
  },
  5: {
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
    categoryId: 5,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.id6.categorylabel",
      defaultMessage: "Facebook Ads headline",
    },
    description: {
      id: "categories.id6.description",
      defaultMessage:
        "Generate scroll-topping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    },
    parentCategory: "Social Media",
  },
  6: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.facebookPrimaryText.labelInput1",
          defaultMessage: "What is your ad about ?",
        },
        placeholder: {
          id: "categories.facebookPrimaryText.placeholder",
          defaultMessage:
            "EasyFlow is a content creation tool using artificial intelligence.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 6,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.facebookPrimaryText.categorylabel",
      defaultMessage: "Facebook Primary Text",
    },
    description: {
      id: "categories.facebookPrimaryText.description",
      defaultMessage: "Explain easily why your ad is relevant for your user.",
    },
    parentCategory: "Social Media",
  },
  7: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.googleHeadline.labelInput1",
          defaultMessage: "What is your website about ?",
        },
        placeholder: {
          id: "categories.googleHeadline.placeholder",
          defaultMessage:
            "EasyFlow is a content creation tool using artificial intelligence.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 7,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.googleHeadline.categorylabel",
      defaultMessage: "Google Headline",
    },
    description: {
      id: "categories.googleHeadline.description",
      defaultMessage:
        "Convert your user with the right line in Google results page",
    },
    parentCategory: "Google",
  },
  8: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.googleDescription.labelInput1",
          defaultMessage: "What is your page or website about ?",
        },
        placeholder: {
          id: "categories.googleDescription.placeholder",
          defaultMessage:
            "EasyFlow is a content creation tool using artificial intelligence.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 8,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.googleDescription.categorylabel",
      defaultMessage: "Google Description",
    },
    description: {
      id: "categories.googleDescription.description",
      defaultMessage:
        "Find the right words to intrigue your user and let them know that your site contains exactly what they are looking for.",
    },
    parentCategory: "Google",
  },
  9: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.linkedinAdText.labelInput1",
          defaultMessage: "What is your ad about ?",
        },
        placeholder: {
          id: "categories.linkedinAdText.placeholder",
          defaultMessage:
            "EasyFlow is a content creation tool using artificial intelligence.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 9,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.linkedinAdText.categorylabel",
      defaultMessage: "Linkedin Ad",
    },
    description: {
      id: "categories.linkedinAdText.description",
      defaultMessage:
        "Attract the attention of your user with the keywords that concern them.",
    },
    parentCategory: "Social Media",
  },
  10: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.blogIdeas.labelInput1",
          defaultMessage: "What is your blog about ?",
        },
        placeholder: {
          id: "categories.blogIdeas.placeholder",
          defaultMessage:
            "EasyFlow is a content creation tool using artificial intelligence.",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 10,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.blogIdeas.categorylabel",
      defaultMessage: "Blog Post ideas",
    },
    description: {
      id: "categories.blogIdeas.description",
      defaultMessage: "Find some ideas about your next blog post..",
    },
    parentCategory: "Blog",
  },
  11: {
    inputs: [
      {
        name: "value",
        maxLengthInput: 100,
        label: {
          id: "categories.followUpEmail.labelInput1",
          defaultMessage: "What did you talk about with your customer ?",
        },
        placeholder: {
          id: "categories.followUpEmail.placeholder",
          defaultMessage:
            "Our meeting about artificial intelligence software for your company",
        },
        inputType: "textarea",
      },
    ],
    categoryId: 11,
    urlIcon: "/icons/image_24.png",
    name: {
      id: "categories.followUpEmail.categorylabel",
      defaultMessage: "Follow-up Email",
    },
    description: {
      id: "categories.followUpEmail.description",
      defaultMessage: "Ask a prospect for news on a particular topic.",
    },
    parentCategory: "Blog",
  },
};

const transformDictionnaryIntoArray = (dictionnary) => {
  let finalArray = [];
  for (const category in dictionnary) {
    let temporaryObject = {
      name: {
        id: dictionnary[category].name.id,
        defaultMessage: dictionnary[category].name.defaultMessage,
      },
      description: {
        id: dictionnary[category].description.id,
        defaultMessage: dictionnary[category].description.defaultMessage,
      },
      parentCategory: dictionnary[category].parentCategory,
      urlLogo: dictionnary[category].urlIcon,
      categoryId: dictionnary[category].categoryId,
    };
    finalArray = [...finalArray, temporaryObject];
  }
  return finalArray;
};

const listOfCategories = transformDictionnaryIntoArray(categoriesDefinition);

module.exports = { categoriesDefinition, listOfCategories };
