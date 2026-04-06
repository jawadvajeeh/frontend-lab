import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import type { JSX } from "react/jsx-dev-runtime";

const buttonVariants = cva("inline-flex items-center text-fs-sm rounded-md", {
  variants: {
    variant: {
      default: "cn-button-variant-default",
      ghost: "cn-button-variant-ghost",
    },
    size: {
      default: "cn-button-size-default",
      xs: "cn-button-size-xs",
      sm: "cn-button-size-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = <Tag extends keyof JSX.IntrinsicElements = "button">({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: React.ComponentPropsWithoutRef<Tag> &
  VariantProps<typeof buttonVariants> & { as?: Tag }) => {
  const { as: Comp = "button" } = props;
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </Comp>
  );
};

export { Button };
