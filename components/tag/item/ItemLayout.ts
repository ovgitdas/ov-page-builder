export interface Field {
  type: "text" | "image"
  name: string
  value: string
}

export type ChildrenTypes = Node[] | Field

export interface Node {
  width?: number
  height?: number
  style: string
  children: ChildrenTypes
}

export interface ItemLayout {
  link: string
  node: Node
  meta: { [key: string]: string }
}

export const defaultLayout: ItemLayout = {
  link: "/item/{item_id}",
  node: {
    width: 100,
    height: 100,
    style:
      "display: flex; flex-direction: column; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; font-family: sans-serif; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
    children: [
      {
        width: 100,
        height: 60,
        style: "position: relative; overflow: hidden;",
        children: [
          {
            width: 100,
            height: 100,
            style:
              "display: flex; justify-content: center; align-items: center;",
            children: {
              name: "item_image",
              type: "image",
              value:
                "https://m.media-amazon.com/images/I/81swJjF4F6L._AC_UL320_.jpg",
            },
          },
          {
            width: 30,
            height: 15,
            style:
              "position: absolute; top: 8px; left: 8px; background-color: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75em; font-weight: bold;",
            children: {
              name: "discount_text",
              type: "text",
              value: "{discount}% OFF",
            },
          },
        ],
      },
      {
        width: 100,
        height: 40,
        style:
          "padding: 8px; display: flex; flex-direction: column; justify-content: space-between;",
        children: [
          {
            width: 100,
            height: 20,
            style:
              "font-size: 1em; font-weight: bold; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
            children: {
              name: "item_name",
              type: "text",
              value: "{item_name}",
            },
          },
          {
            width: 100,
            height: 20,
            style:
              "display: flex; justify-content: space-between; align-items: center; margin-top: 4px;",
            children: [
              {
                width: 60,
                height: 20,
                style: "display: flex; align-items: baseline;",
                children: [
                  {
                    width: 50,
                    height: 20,
                    style: "font-size: 1.1em; font-weight: bold; color: #333;",
                    children: {
                      name: "unit_price",
                      type: "text",
                      value: "₹{unit_price}",
                    },
                  },
                  {
                    width: 50,
                    height: 20,
                    style:
                      "font-size: 0.8em; color: #888; text-decoration: line-through; margin-left: 8px;",
                    children: {
                      name: "unit_mrp",
                      type: "text",
                      value: "MRP ₹{unit_mrp}",
                    },
                  },
                ],
              },
              {
                width: 40,
                height: 20,
                style:
                  "display: flex; align-items: center; justify-content: flex-end; font-size: 0.9em; color: #FFC107;",
                children: {
                  name: "rating",
                  type: "text",
                  value: "⭐ {rating}",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  meta: {
    item_image: "{item_image}",
    item_name: "{item_name}",
    item_id: "{item_id}",
    cat_id: "{cat_id}",
    br_id: "{br_id}",
    gen_id: "{gen_id}",
    rank: "{rank}",
    timestamp: "{timestamp}",
    store_id: "{store_id}",
    min_qty: "{min_qty}",
    unit_mrp: "{unit_mrp}",
    unit_price: "{unit_price}",
    discount: "{discount}",
    store_pincode: "{store_pincode}",
    rating: "{rating}",
    active: "{active}",
    sponsored_till: "{sponsored_till}",
    sponsored_rank: "{sponsored_rank}",
    created_on: "{created_on}",
  },
}
