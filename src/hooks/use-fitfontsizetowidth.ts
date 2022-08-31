type FontSizeVw = `${string}vw`;

const useFitFontSizeToWidth =
  () =>
  (width: number, text: string, letterSpacing = 1): FontSizeVw => {
    const wrapper = width / window.innerWidth;
    const textLength = text.length > 2 ? text.length : 2;
    const fontSizeVw = (wrapper / (textLength * letterSpacing)) * 100;

    return `${fontSizeVw.toString()}vw`;
  };

export default useFitFontSizeToWidth;
