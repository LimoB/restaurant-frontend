import { Button } from "../../components/ui/button";

type Props = {
  form: { name: string; state_id: number };
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
  states: { id: number; name: string }[];
};

export default function CityForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  states,
}: Props) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-800 dark:text-gray-100">
          City Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="border rounded px-3 py-2 bg-white text-gray-800 dark:bg-slate-800 dark:text-white dark:border-slate-600"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="state" className="text-sm font-medium text-gray-800 dark:text-gray-100">
          State
        </label>
        <select
          id="state"
          value={form.state_id}
          onChange={(e) => onChange("state_id", parseInt(e.target.value))}
          className="border rounded px-3 py-2 bg-white text-gray-800 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        >
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
