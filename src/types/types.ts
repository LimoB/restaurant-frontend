// types.ts
export type MenuFormProps = {
  form: {
    name: string;
    price: string;
    ingredients: string;
    image_url: string;
    category_id: number;
    restaurant_id: number;
    active: boolean;
  };
  onChange: (field: string, value: string | number | boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
};
