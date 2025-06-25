export interface Order {
  id: number;
  status: "pending" | "accepted" | "rejected" | "delivered";
  final_price: string;
  price: string;
  discount: string;
  comment?: string;
  actual_delivery_time?: string;
  created_at: string;
  updated_at?: string;

  user?: {
    id?: number;
    name: string;
    email?: string;
    phone?: string;
    address?: {
      city: {
        name: string;
        state: {
          name: string;
        };
      };
    };
  };

  restaurant?: {
    id?: number;
    name: string;
    city?: {
      name: string;
      state: {
        name: string;
      };
    };
  };

  driver?: {
    id?: number;
    name: string;
    car_make?: string;
    car_model?: string;
    car_year?: string;
    license_plate?: string;
    active?: boolean;
    user?: {
      id: number;
      name: string;
      email?: string;
      phone?: string;
    };
  };

  delivery_address?: {
    id?: number;
    city: {
      name: string;
      state: {
        name: string;
      };
    };
  };

  orderMenuItems?: {
    id: number;
    quantity: number;
    price: string;
    comment?: string;
    menu_item: {
      id: number;
      name: string;
      description?: string;
      price: string;
      category: {
        id: number;
        name: string;
      };
    };
  }[];

  comments?: {
    id: number;
    comment_text: string;
    comment_type: "restaurant" | "driver" | "order";
    rating: number;
    user: {
      id: number;
      name: string;
    };
  }[];

  statuses?: {
    id: number;
    created_at: string;
    statusCatalog: {
      name: string;
    };
  }[];
}
