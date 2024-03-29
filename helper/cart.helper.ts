import { ProductService } from "../service/product/product.service";
import { getSetting, getSettingValue } from "../utils/Setting";
import { CookieHelper } from "./cookie.helper";
import { StringHelper } from "./string.helper";

export type CartOption = {
  id?: number; // for internal use
  product_id: number;
  quantity: number;
  attribute?: any;
  // generate
  subtotal?: number;
};

export type CartMeta = {
  subtotal: number;
  data: CartOption[];
};
/**
 * CartHelper - Session based cart
 */
export class CartHelper {
  /**
   * Store product items to session cart
   * @param {*} items
   */
  static store(items: CartOption, callback?: Function) {
    const id = 1;
    // const cartData: CartOption = {
    //   id: generateCode(16),
    //   product_id: items.product_id,
    //   quantity: items.quantity,
    //   attribute: items.attribute,
    // };
    const cartData: CartOption = {
      id: id,
      product_id: items.product_id,
      quantity: items.quantity,
      attribute: items.attribute,
    };

    let data: CartOption[] = [];

    data =
      CookieHelper.get({ key: "carts" }) == null
        ? []
        : JSON.parse(CookieHelper.get({ key: "carts" }));

    if (data.length > 0) {
      const last_item_id = data.slice(data.length - 1);
      if (last_item_id[0].id) {
        cartData.id = last_item_id[0].id + 1;
      }
    }
    // check if duplicate product exist
    const existingProduct = data.find(
      (dt) => dt.product_id == cartData.product_id
    );

    if (existingProduct) {
      // update quantity if exists
      data = data.map((dt) => {
        if (existingProduct.product_id == dt.product_id) {
          dt.quantity++;
        }
        return { ...dt };
      });
    } else {
      data.push(cartData);
    }

    CookieHelper.set({ key: "carts", value: JSON.stringify(data) });
    if (callback) {
      callback();
    }
  }

  /**
   * Update product items to session cart
   * @param {*} items
   */
  static update(id: number, quantity: number, callback?: Function) {
    let data: CartOption[] = [];

    data =
      CookieHelper.get({ key: "carts" }) == null
        ? []
        : JSON.parse(CookieHelper.get({ key: "carts" }));

    // check if product exist
    const existingProduct = data.find((dt) => dt.id == id);

    if (existingProduct) {
      if (quantity <= 0) {
        data = data.reduce(function (prev: any[], current) {
          if (current.id != id) {
            prev.push(current);
          }
          return prev;
        }, []);
      } else {
        // update quantity if exists
        data = data.map((dt) => {
          if (existingProduct.id == dt.id) {
            dt.quantity = quantity;
          }
          return { ...dt };
        });
      }

      CookieHelper.set({ key: "carts", value: JSON.stringify(data) });
      if (callback) {
        callback();
      }
    }
  }

  /**
   * Display counts of all products from session cart
   * @param {*} context
   * @returns
   */
  static count(context = null) {
    let data = [];
    data =
      CookieHelper.get({ key: "carts", context: context }) == null
        ? []
        : JSON.parse(CookieHelper.get({ key: "carts", context: context }));

    return data.length;
  }

  /**
   * Display all products from session cart
   * @returns
   */
  static async findAll(context = null) {
    try {
      let data: CartOption[] = [];
      data =
        CookieHelper.get({ key: "carts", context: context }) == null
          ? []
          : JSON.parse(CookieHelper.get({ key: "carts", context: context }));

      if (data) {
        data = await Promise.all(
          data.map(async (item) => {
            try {
              const settings = await getSetting();
              const productService = await ProductService.findOne(
                item.product_id
              );
              const product = productService.data;

              Object.assign(item, { subtotal: product.price });
              Object.assign(item, {
                currency: getSettingValue("currency_sign", settings),
              });
              // Object.assign(item, {
              //   attribute: JSON.parse(item.attribute),
              // });
              Object.assign(item, {
                product: product,
              });
              let total = 0.0;
              // if (item.attribute.length > 0) {
              //   if (item.variant.product.option_set) {
              //     // if option set available
              //     const attributeData = item.attribute;
              //     const elementData = item.variant.product.option_set.elements;

              //     const totalMap = attributeData.map((attribute: any) => {
              //       const optionSetPrice = elementData.map((element: any) => {
              //         if (element.type == "select") {
              //           const elementPrice = element.option_value.map(
              //             (optionValue: any) => {
              //               if (optionValue.value == attribute.value) {
              //                 return Number(optionValue.price) ?? 0.0;
              //               } else {
              //                 return 0.0;
              //               }
              //             }
              //           );
              //           const elementPriceReduce = elementPrice.reduce(
              //             (curr: number, prev: number) => {
              //               return Number(curr) + Number(prev);
              //             }
              //           );
              //           return elementPriceReduce;
              //         } else {
              //           return 0.0;
              //         }
              //       });
              //       const optionSetPriceReduce = optionSetPrice.reduce(
              //         (curr: number, prev: number) => {
              //           return Number(curr) + Number(prev);
              //         }
              //       );
              //       return optionSetPriceReduce;
              //     });

              //     const totalOptionSetPrice = totalMap.reduce(
              //       (curr: number, prev: number) => {
              //         return Number(curr) + Number(prev);
              //       },
              //       0.0
              //     );
              //     total += totalOptionSetPrice;
              //   }
              // }
              // Discount
              if (product.is_sale) {
                total += StringHelper.discount(product.price, product.discount);
              } else {
                total += Number(product.price);
              }

              Object.assign(item, {
                subtotal: total * item.quantity,
              });
              return item;
            } catch (error) {
              throw error;
            }
          })
        );
        if (data) {
          return data;
        }
      }
    } catch (error) {
      console.log(CartHelper.removeAll());
      return [];
    }
  }

  /**
   * Display all cart data with products from session cart
   * @returns
   */
  static async cartData(context = null): Promise<CartMeta> {
    const cartData: CartMeta = { data: [], subtotal: 0 };
    const _cartData = await this.findAll(context);
    if (_cartData) {
      Object.assign(cartData, { data: _cartData });

      let subtotal = 0;
      for (const cart of _cartData) {
        subtotal += Number(cart.subtotal);
      }

      Object.assign(cartData, { subtotal: subtotal });

      return cartData;
    } else {
      return cartData;
    }
  }

  /**
   * Remove product from session cart
   * @param {*} id
   */
  static remove(id: string, callback?: Function) {
    try {
      let data = [];
      data =
        CookieHelper.get({ key: "carts" }) == null
          ? []
          : JSON.parse(CookieHelper.get({ key: "carts" }));
      data = data.filter((item: any) => item.id != id);

      CookieHelper.set({ key: "carts", value: JSON.stringify(data) });
      if (callback) {
        callback();
      }
      return 1;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove all product from session cart
   */
  static removeAll(callback?: Function) {
    try {
      CookieHelper.destroy({ key: "carts" });
      if (callback) {
        callback();
      }
      return 1;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Generate uniue code
 * @param {*} length
 * @returns
 */
function generateCode(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var text = "";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
