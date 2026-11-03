import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CATEGORIES } from "../../types/campus-event";
import type { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface Props {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

export default function EventForm({ initialData, submitText, onSubmit }: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handler: name özelliği state'teki anahtarla aynı.
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  function fieldProps(name: keyof EventFormData) {
    return {
      id: name,
      name,
      value: data[name],
      onChange: handleChange,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-hata` : undefined,
    };
  }

  function ErrorText({ name }: { name: keyof EventFormData }) {
    return errors[name] ? (
      <span className="hata-metni" id={`${name}-hata`}>
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    // noValidate: tarayıcı balonları yerine kendi mesajlarımız çıksın.
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="alan">
        <label htmlFor="title">Etkinlik Adı</label>
        <input type="text" {...fieldProps("title")} />
        <ErrorText name="title" />
      </div>

      <div className="alan">
        <label htmlFor="category">Kategori</label>
        <select {...fieldProps("category")}>
          <option value="">Seçiniz</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <ErrorText name="category" />
      </div>

      <div className="alan">
        <label htmlFor="date">Tarih</label>
        <input type="date" {...fieldProps("date")} />
        <ErrorText name="date" />
      </div>

      <div className="alan">
        <label htmlFor="time">Saat</label>
        <input type="time" {...fieldProps("time")} />
        <ErrorText name="time" />
      </div>

      <div className="alan">
        <label htmlFor="location">Yer</label>
        <input type="text" {...fieldProps("location")} />
        <ErrorText name="location" />
      </div>

      <div className="alan">
        <label htmlFor="capacity">Kontenjan</label>
        <input type="text" inputMode="numeric" {...fieldProps("capacity")} />
        <ErrorText name="capacity" />
      </div>

      <div className="alan">
        <label htmlFor="description">Açıklama</label>
        <textarea rows={5} {...fieldProps("description")} />
        <ErrorText name="description" />
      </div>

      <button type="submit" className="buton">
        {submitText}
      </button>
    </form>
  );
}
