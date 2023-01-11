import { ProductService } from "../service/product/product.service";
import { getSetting, getSettingValue } from "../utils/Setting";
import { CookieHelper } from "./cookie.helper";
import { StringHelper } from "./string.helper";

/**
 * CartHelper - Session based cart
 */
export class CartHelper {
  /**
   * Store product items to session cart
   * @param {*} items
   */
  static store(items: any, callback?: Function) {
    // [{id, product_id, quantity, attribute}]
    const cartData = {
      id: generateCode(16),
      product_id: items.product_id,
      quantity: items.quantity,
      attribute: items.attribute,
    };
    let data = [];

    data =
      CookieHelper.get({ key: "carts" }) == null
        ? []
        : JSON.parse(CookieHelper.get({ key: "carts" }));
    data.push(cartData);

    CookieHelper.set({ key: "carts", value: JSON.stringify(data) });
    if (callback) {
      callback();
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
      let data = [];
      data =
        CookieHelper.get({ key: "carts", context: context }) == null
          ? []
          : JSON.parse(CookieHelper.get({ key: "carts", context: context }));

      if (data) {
        data = await Promise.all(
          data.map(async (item: any) => {
            try {
              const settings = await getSetting();
              const productService = await ProductService.findOne(
                item.product_id
              );
              const productData = await productService.data;
              const product = productData.data;

              item.subtotal = product.price;
              item.currency = getSettingValue("currency_sign", settings);
              item.attribute = JSON.parse(item.attribute);
              item.product = product;

              let total = 0.0;
              if (item.attribute.length > 0) {
                if (item.variant.product.option_set) {
                  // if option set available
                  const attributeData = item.attribute;
                  const elementData = item.variant.product.option_set.elements;

                  const totalMap = attributeData.map((attribute: any) => {
                    const optionSetPrice = elementData.map((element: any) => {
                      if (element.type == "select") {
                        const elementPrice = element.option_value.map(
                          (optionValue: any) => {
                            if (optionValue.value == attribute.value) {
                              return Number(optionValue.price) ?? 0.0;
                            } else {
                              return 0.0;
                            }
                          }
                        );
                        const elementPriceReduce = elementPrice.reduce(
                          (curr: number, prev: number) => {
                            return Number(curr) + Number(prev);
                          }
                        );
                        return elementPriceReduce;
                      } else {
                        return 0.0;
                      }
                    });
                    const optionSetPriceReduce = optionSetPrice.reduce(
                      (curr: number, prev: number) => {
                        return Number(curr) + Number(prev);
                      }
                    );
                    return optionSetPriceReduce;
                  });

                  const totalOptionSetPrice = totalMap.reduce(
                    (curr: number, prev: number) => {
                      return Number(curr) + Number(prev);
                    },
                    0.0
                  );
                  total += totalOptionSetPrice;
                }
              }
              // Discount
              if (product.is_sale) {
                total += StringHelper.discount(product.price, product.discount);
              } else {
                total += Number(product.price);
              }

              item.subtotal = total;

              return item;
            } catch (error) {
              throw error;
            }
          })
        );
      }

      return data;
    } catch (error) {
      console.log(CartHelper.removeAll());
      return [];
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
