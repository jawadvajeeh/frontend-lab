import type { ComponentPropsWithoutRef } from "react";

type PageProps = {} & ComponentPropsWithoutRef<"main">;

function Page(props: PageProps) {
  const { className } = props;
  return <main className={className ?? "p-4"}>{props.children}</main>;
}

export { Page };
