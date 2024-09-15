import type { Schema, Attribute } from '@strapi/strapi';

export interface CartCart extends Schema.Component {
  collectionName: 'components_cart_carts';
  info: {
    displayName: 'Cart';
    icon: 'shoppingCart';
  };
  attributes: {
    products: Attribute.Relation<
      'cart.cart',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart.cart': CartCart;
    }
  }
}
