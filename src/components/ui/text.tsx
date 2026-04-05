import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TextTags = "p" | "span" | "h1" | "h2" | "h3" | "h4";

function Text<Element extends TextTags = "p">(
  props: {
    as?: Element;
    children?: ReactNode;
  } & ComponentPropsWithoutRef<Element>,
) {
  const { as: Comp = "p", children, ...rest } = props;
  return <Comp {...rest}>{children}</Comp>;
}

export { Text };
