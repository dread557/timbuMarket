export interface IPhoto {
  model_name: string;
  model_id: string;
  organization_id: string;
  filename: string;
  url: string;
  is_featured: boolean;
  save_as_jpg: boolean;
  is_public: boolean;
  file_rename: boolean;
  position: number;
}

export interface IProduct {
  name: string;
  description: string | null;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string | null;
  unavailable: boolean;
  unavailable_start: string | null;
  unavailable_end: string | null;
  id: string;
  parent_product_id: string | null;
  parent: string | null;
  organization_id: string;
  stock_id: string | null;
  product_image: string[];
  categories: string[];
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: IPhoto[];
  prices: any | null;
  stocks: any | null;
  current_price: any;
  is_deleted: boolean;
  available_quantity: number | null;
  selling_price: number | null;
  discounted_price: number | null;
  buying_price: number | null;
  extra_infos: any | null;
  featured_reviews: any | null;
  unavailability: any[];
}
