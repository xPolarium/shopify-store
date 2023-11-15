const CART_FRAGMENT = `
fragment cartFragment on Cart {
  id
  totalQuantity
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          id
          title
          image {
            url
            altText
            width
            height
          }
          product {
            handle
            title
          }
        }
      }
      cost {
        amountPerQuantity{
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

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
        currencyCode
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
	product(handle: $handle) {
	  ...productFragment
	}
}
${PRODUCT_FRAGMENT}
`;

export const GetCartQuery = `
query ($id: ID!) {
  cart(id: $id) {
    ...cartFragment
  }
}
${CART_FRAGMENT}
`;
