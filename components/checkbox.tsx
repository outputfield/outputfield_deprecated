import React from "react";

type Props = {
  name: string;
  value: boolean;
};

const Checkbox = React.forwardRef(
  ({ value, name, label, onChange, defaultChecked }: Props, forwardedRef) => {
    const [checked, setChecked] = React.useState(defaultChecked || false);

    const handleChange = (e) => {
        onChange(name, e.target.checked)
        setChecked(!checked)
    }

    React.useEffect(() => {
        setChecked(value)
    }, [value])

    return (
      <div className="p-4" key={name}>
        <div className="flex items-center mr-4 mb-2">
          <input
            type="checkbox"
            id={name}
            name={name}
            className="opacity-0 absolute h-8 w-8 peer"
            value={true}
            onChange={handleChange}
            checked={checked}
          />
          <div className="bg-white border-2 border-blue w-3 h-3 flex flex-shrink-0 justify-center items-center mr-2 focus:border-black">
            {checked && (
              <svg
                width="22"
                height="27"
                viewBox="0 0 22 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_17_1381)">
                  <path
                    d="M5 15.2222L9 21L17 5"
                    stroke="#001AFF" // TODO: replace with theme blue
                    strokeWidth="2"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_17_1381"
                    x="0.177734"
                    y="0.552788"
                    width="21.7168"
                    height="26.405"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0.1 0 0 0 0 1 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_17_1381"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_17_1381"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            )}
          </div>
          <label htmlFor={name} className="peer-checked:text-blue">
            {label}
          </label>
        </div>
      </div>
    );
  }
);

export default Checkbox;
