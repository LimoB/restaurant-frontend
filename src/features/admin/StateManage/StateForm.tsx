import { Button } from "@/components/ui/button";

type Props = {
  form: { name: string; code: string };
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
};

export default function StateForm({ form, onChange, onSubmit, onCancel, isEdit }: Props) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* State Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          State Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="border rounded px-3 py-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          required
        />
      </div>

      {/* State Code */}
      <div className="flex flex-col gap-1">
        <label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          State Code
        </label>
        <input
          id="code"
          type="text"
          value={form.code}
          onChange={(e) => onChange("code", e.target.value)}
          className="border rounded px-3 py-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
