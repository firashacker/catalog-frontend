interface FormInputProps {
  inputId: string;
  label: string;
  inputOptions?: any;
}

const FormInput = ({ label, inputId, inputOptions }: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...inputOptions}
        className="border-gray border-2 w-full px-4 py-3 mt-5 rounded-lg border-gray-200 bg-white shadow-sm appearance-none focus:border-blue-500 outline-none focus:ring-2 ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
