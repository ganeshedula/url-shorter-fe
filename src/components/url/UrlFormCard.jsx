import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { DateTimePicker } from "../common/DateTimePicker";
import { formatForDateTimeLocal } from "../../utils/formatters";
import { cn } from "../../utils/cn";

const schema = z.object({
  url: z.string().url("Enter a valid URL").refine((value) => /^https?:\/\//.test(value), {
    message: "URL must start with http:// or https://",
  }),
  expirationDate: z.string().optional(),
});

export function UrlFormCard({ onSubmit, initialValues, mode = "create", loading }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: initialValues?.url || "",
      expirationDate: formatForDateTimeLocal(initialValues?.expirationDate),
    },
  });

  const expirationDateValue = watch("expirationDate");

  useEffect(() => {
    reset({
      url: initialValues?.url || "",
      expirationDate: formatForDateTimeLocal(initialValues?.expirationDate),
    });
  }, [initialValues?.url, initialValues?.expirationDate, reset]);

  const submit = async (values) => {
    const payload = {
      url: values.url,
      expirationDate: values.expirationDate
        ? new Date(values.expirationDate).toISOString()
        : null,
    };

    await onSubmit(payload);
    if (mode === "create") {
      reset({ url: "", expirationDate: "" });
      toast.success("New short link created.");
    }
  };

  return (
    <Card className={mode === "create" ? "relative z-20" : ""}>
      <div className="mb-6">
        <h3 className="text-xl">{mode === "create" ? "Create new short link" : "Edit link"}</h3>
        <p className="mt-2">Stay aligned with the backend schema: URL plus optional expiration date.</p>
      </div>
      <form
        className={cn(
          "grid gap-4",
          mode === "edit" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.6fr_1fr_auto]"
        )}
        onSubmit={handleSubmit(submit)}
      >
        <Input
          id={`${mode}-url`}
          label="Destination URL"
          placeholder="https://example.com/product/launch"
          error={errors.url?.message}
          {...register("url")}
        />
        <DateTimePicker
          id={`${mode}-expiration`}
          label="Expiration"
          value={expirationDateValue}
          onChange={(newVal) =>
            setValue("expirationDate", newVal, { shouldValidate: true, shouldDirty: true })
          }
          error={errors.expirationDate?.message}
        />
        <div className={cn("flex items-end", mode === "edit" && "pt-2 justify-end")}>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : mode === "create" ? "Shorten URL" : "Save changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

