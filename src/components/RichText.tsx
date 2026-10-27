import { Fragment } from "react";
import type { Rich, RichNode } from "../data/types";

function Node({ node }: { node: RichNode }) {
  const kids = node.children ? <RichText value={node.children} /> : null;
  switch (node.tag) {
    case "br":
      return <br />;
    case "a": {
      const external = !!node.href && /^https?:/.test(node.href);
      return (
        <a
          className={node.className}
          href={node.href}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {kids}
        </a>
      );
    }
    default: {
      const Tag = node.tag;
      return <Tag className={node.className}>{kids}</Tag>;
    }
  }
}

export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Node key={i} node={part} />
        ),
      )}
    </>
  );
}
