import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FiLink, FiArrowRight } from "react-icons/fi";
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
      toast.success("Short link created");
    }
  };

  return (
    <Card className={cn("p-4 sm:p-6", mode === "create" ? "relative z-20" : "")}>
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-label">
          {mode === "create" ? "Shorten a Link" : "Edit Link Details"}
        </h3>
        <p className="mt-0.5 text-xs text-label-secondary">
          Enter destination URL and an optional expiration date.
        </p>
      </div>

      <form
        className={cn(
          "grid gap-3 sm:gap-4",
          mode === "edit" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.5fr_1.1fr_auto]"
        )}
        onSubmit={handleSubmit(submit)}
      >
        <Input
          id={`${mode}-url`}
          label="Destination URL"
          placeholder="https://example.com/any/long/path"
          icon={FiLink}
          error={errors.url?.message}
          {...register("url")}
        />

        <DateTimePicker
          id={`${mode}-expiration`}
          label="Expiration"
          value={expirationDateValue}
          placement={mode === "edit" ? "top" : "auto"}
          onChange={(newVal) =>
            setValue("expirationDate", newVal, { shouldValidate: true, shouldDirty: true })
          }
          error={errors.expirationDate?.message}
        />

        <div className={cn("flex items-end", mode === "edit" && "pt-2 justify-end")}>
          <Button
            type="submit"
            className="w-full h-[42px]"
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : mode === "create" ? (
              <>
                <span>Shorten</span>
                <FiArrowRight size={15} />
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
