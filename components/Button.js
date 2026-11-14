import Link from "next/link";

// The outlined, edge-lit button used for every call to action.
export default function Button({ href, children, className = "", ...rest }) {
  const cls = `gleam caps ${className}`;
  if (href?.startsWith("http"))
    return (
      <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>
        {children}
      </a>
    );
  if (href)
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
