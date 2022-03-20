
export const Highlighted = ({ text = "", highlight = "" }) => {

    console.log("Content Text: " + text);
    console.log("Highlighted Value: " + highlight);

    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const splitText = text.split(regex);

    console.log("Chunk Text: " + splitText);
  
    return (
      <span>
        {splitText.filter(String).map((part, i) => {
            return regex.test(part) ? (
                <b key={i}>{part}</b>
            ) : (
                <span key={i}>{part}</span>
            );
        })}
      </span>
    );
};