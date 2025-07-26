const BUTTON_STYLE_CLASS = {
  base: "bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded hover:opacity-90 hover:from-slate-500 hover:to-slate-700 transition duration-300  font-semibold",
  baseFullW:
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded hover:opacity-90 transition duration-300 w-full font-semibold",
  danger:
    "bg-red-500 hover:bg-red-700 transition duration-300 text-white font-bold py-2 px-4 rounded",
  dangerInverted:
    "hover:bg-red-500  transition duration-300 text-white font-bold py-2 px-4 rounded",
  dangerFullW:
    "bg-red-500 hover:bg-red-700  transition duration-300 text-white font-bold py-2 px-4 rounded w-full",
  inverted:
    "bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-600 font-bold py-2 px-4 rounded",
  clicked:
    "bg-gradient-to-r from-slate-500 to-slate-700 hover:from-blue-500 hover:to-purple-600 text-white py-2 px-4 rounded hover:opacity-90 transition duration-300 mt-8  font-semibold",
};

const getButton = (buttonStyle: string) => {
  switch (buttonStyle) {
    case "base":
      return BUTTON_STYLE_CLASS.base;
    case "baseFullW":
      return BUTTON_STYLE_CLASS.baseFullW;
    case "danger":
      return BUTTON_STYLE_CLASS.danger;
    case "dangerInverted":
      return BUTTON_STYLE_CLASS.dangerInverted;
    case "dangerFullW":
      return BUTTON_STYLE_CLASS.dangerFullW;
    case "inverted":
      return BUTTON_STYLE_CLASS.inverted;
    case "clicked":
      return BUTTON_STYLE_CLASS.clicked;
    default:
      return "";
  }
};

interface ButtonOptions {
  children?: React.ReactNode | string;
  onButtonClick?: () => {} | void;
  buttonType?: "submit" | "reset" | "button" | undefined;
  buttonStyle: string;
  otherProps?: any;
}

function Button({
  children,
  buttonType,
  buttonStyle = "base",
  onButtonClick,
  ...otherProps
}: ButtonOptions) {
  const CustomButtonClass = getButton(buttonStyle);
  //const [clicked, setClicked] = useState(false);

  //const togelClicked = () => setClicked(!clicked);

  if (CustomButtonClass) {
    return (
      <button
        onClick={() => {
          //togelClicked();
          onButtonClick ? onButtonClick() : () => {};
        }}
        type={buttonType}
        {...otherProps}
        className={`${CustomButtonClass}`}
      >
        {children}
      </button>
    );
  }

  return null;
}

export default Button;
