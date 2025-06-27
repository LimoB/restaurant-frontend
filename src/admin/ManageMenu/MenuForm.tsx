import { Button } from "../../components/ui/button";

type Props = {
  form: {
    name: string;
    price: string;
    ingredients: string;
    image_url: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
};

export default function MenuForm({ form, onChange, onSubmit, onCancel, isEdit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        required
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={(e) => onChange("price", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Ingredients"
        value={form.ingredients}
        onChange={(e) => onChange("ingredients", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Image URL"
        value={form.image_url}
        onChange={(e) => onChange("image_url", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
