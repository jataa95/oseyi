// Splits text into letters (spans with class "ch") so they can be animated.
// Words stay together; "\n" starts a new line.
export default function Letters({ text }) {
  return text.split("\n").map((line, li) => (
    <span key={li} className="block">
      {line.split(" ").map((word, wi, words) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {[...word].map((c, ci) => (
            <span key={ci} className="ch inline-block">
              {c}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  ));
}
