import { cva, type VariantProps } from "class-variance-authority";

const badgeVariant = cva("inline-flex font-semibold rounded-md px-2", {
  variants: {
    variant: {
      default: "cn-badge-variant-default",
      ghost: "cn-badge-variant-ghost",
      urgency: "bg-urgency text-primary-foreground",
      safe: "bg-safe text-primary-foreground",
      attention: "bg-attention text-primary-foreground",
    },
    size: {
      sm: "text-fs-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariant>["variant"];

const Badge = ({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariant>) => {
  return (
    <span className={badgeVariant({ variant, size, className })} {...props}>
      {children}
    </span>
  );
};

export { Badge };
