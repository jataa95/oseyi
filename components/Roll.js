// Text that rolls to a copy of itself when its link or button is hovered.
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  );
}
