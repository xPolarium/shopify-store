const PRODUCT_FRAGMENT = `
fragment productFragment on Product {
  id
  handle
  title
  images(first: 10) {
    nodes {
      url
      width
      height
      altText
    }
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price {
        amount
      }
    }
  }
  featuredImage {
    url
    width
    height
    altText
  }
}`;

export const ProductQuery = `
query Products($first: Int!) {
  products(first: $first) {
    edges {
      node {
        ...productFragment
      }
    }
  }
}
${PRODUCT_FRAGMENT}
`;

export const ProductByHandleQuery = `
query ProductByHandle($handle: String!) {
	productByHandle(handle: $handle) {
	  ...productFragment
	}
}
${PRODUCT_FRAGMENT}
`;
