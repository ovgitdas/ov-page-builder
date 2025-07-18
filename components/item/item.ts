export interface Item {
  item_id: string;
  vendor_id: string;
  gen_id: number;
  br_id: number;
  cat_id: number;
  gst_id: number;
  unit_mrp: string;
  unit_price: string;
  item_name_json: string;
  item_meta_json: string;
  active: number;
  rating: number;
  rank: number;
  created_on: string;
  modified_on: string;
}

export const blankItem: Item = {
  item_id: "",
  vendor_id: "",
  gen_id: 0,
  br_id: 0,
  cat_id: 0,
  gst_id: 0,
  unit_mrp: "",
  unit_price: "",
  item_name_json: "",
  item_meta_json: "",
  active: 0,
  rating: 0,
  rank: 0,
  created_on: "",
  modified_on: "",
};

export interface Generic {
  gen_id: number;
  generic_name: string;
}

export const blankGeneric = {
  gen_id: 0,
  generic_name: "",
};

export interface ItemImage {
  item_id: string;
  item_image_url: string;
  item_image_created_on: string;
}

export interface Itemx extends Generic, Item {
  images: Array<ItemImage>;
}

const an = "abcdefghijklmnopqrstuvwxyz0123456789-";
export const _item_slug = (item: Itemx) =>
  !!item && !!item.generic_name
    ? item.generic_name
        .toLowerCase()
        .split(" ")
        .join("-")
        .split("")
        .filter((x) => an.includes(x))
        .join("")
    : `item_${(Math.random() * 10000000) | 0}`;
