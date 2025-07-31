export interface ItemImage {
  item_id: string;
  item_image_url: string;
  item_image_created_on: string;
}

export interface ItemNameJson {
  id: string;
  source: string;
  text: string;
}

export namespace GenericLayoutJson {
  export interface NodeName {
    type: "text";
    text: string;
  }

  export interface NodeImage {
    type: "image";
    src: string;
    alt: string;
  }

  export interface NodeContainer {
    type: "container";
    children: Node[];
  }

  export interface Node {
    width?: number;
    height?: number;
    style: string;
    value: NodeName | NodeImage | NodeContainer;
  }
}

export interface ItemSmall {
  item_id: string;
  vendor_id: string;
  gen_id: number;
  br_id: number;
  cat_id: number;
  gst_id: number;
  unit_mrp: number;
  unit_price: number;
  min_qty: number;
  discount_percentage: number;
  xrank: number;
  rating: number;
  created_on: string;
  modified_on: string;
  item_name_json: ItemNameJson[];
  gen_name: string;
  gen_layout_json: GenericLayoutJson.Node;
  br_name: string;
  br_cmp: string;
  cat_name: string;
  item_image_url: string;
  //derived later
  item_name: string;
  item_slug: string;
  item_image_alt: string;
}

export const defaultGenericLayoutJson: GenericLayoutJson.Node = {
  width: 240,
  style:
    "min-width: 240px; background-color: white; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 0.375rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden; transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; cursor: pointer;",
  value: {
    type: "container",
    children: [
      {
        width: 240,
        height: 240,
        style:
          "width: 240px; height: 240px; overflow: hidden; position: relative;",
        value: {
          type: "container",
          children: [
            {
              style:
                "object-fit: cover; width: 100%; height: 100%; z-index: 10;",
              value: {
                type: "image",
                src: "{item_image_url}",
                alt: "{item_image_alt}",
              },
            },
          ],
        },
      },
      {
        height: 180,
        style:
          "height: 180px; padding-left: 1rem; padding-right: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 0.25rem; justify-content: space-between;",
        value: {
          type: "container",
          children: [
            {
              style:
                "font-size: 1rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-clamp: 2;",
              value: {
                type: "text",
                text: "{item_name}",
              },
            },
            {
              style:
                "width: 100%; text-align: center; display: flex; gap: 0.25rem; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; justify-content: center; align-items: center;",
              value: {
                type: "container",
                children: [
                  {
                    style:
                      "color: #0d9488; font-size: 1rem; line-height: 1.5rem; font-weight: 600;",
                    value: {
                      type: "text",
                      text: "₹{unit_price}",
                    },
                  },
                  {
                    style:
                      "text-decoration-line: line-through; color: #991b1b; font-size: 0.75rem; line-height: 1rem;",
                    value: {
                      type: "text",
                      text: "₹{unit_mrp}",
                    },
                  },
                  {
                    style:
                      "color:green; background:#cccccc55; padding:0.25rem; font-size: 1rem; line-height: 1rem;",
                    value: {
                      type: "text",
                      text: "{discount_percentage}% off",
                    },
                  },
                ],
              },
            },
            {
              style:
                "font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-clamp: 2;",
              value: {
                type: "text",
                text: "{rating}",
              },
            },
            {
              style:
                "padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem; background-color: #fb923c; border-radius: 0.125rem;",
              value: {
                type: "text",
                text: "Buy now",
              },
            },
          ],
        },
      },
    ],
  },
};

function rating(rating: number) {
  const stars = [1, 2, 3, 4, 5]
    .map(
      (star) =>
        `<span style="color: ${
          star <= rating ? "#f1c40f" : "#cccccc"
        }; font-size:1.2rem;">★</span>`
    )
    .join("");
  return `<div>${rating} ${stars}</div>`;
}

export function replacePlaceholders(
  templateString: string,
  values: { [key: string]: string }
) {
  let result = templateString;
  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      // Create a regular expression to match {key} globally
      // The 'g' flag ensures all occurrences are replaced
      // The 'i' flag makes it case-insensitive (optional, but often useful for placeholders)
      // Escaping the curly braces as they are special characters in regex
      const regex = new RegExp(`\\{${key}\\}`, "g");
      result = result.replace(
        regex,
        key === "rating" ? rating(+values[key]) : values[key]
      );
    }
  }
  return result;
}
