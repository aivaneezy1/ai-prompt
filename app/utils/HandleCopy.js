"ues client"
export const handleCopy = (text, setCopied) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(""), 3000);
  };
