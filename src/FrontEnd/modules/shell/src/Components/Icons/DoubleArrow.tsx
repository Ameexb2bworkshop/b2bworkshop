import * as React from "react";

const Edit: React.FC<{ width?: number; height?: number; color1?: string; className?: string }> = ({
    width = 24,
    height = 24,
    color1 = "#9B9B9B",
    className,
}) => (
    <svg
        width={width}
        height={height}
        focusable="false"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3.07501 7.4C2.97501 7.2 2.97501 6.9 3.07501 6.6C3.17501 6.5 3.17501 6.4 3.27501 6.3L7.27501 2.3C7.67501 1.9 8.27501 1.9 8.67501 2.3C9.07501 2.7 9.07501 3.3 8.67501 3.7L6.37501 6H15.975C16.575 6 16.975 6.4 16.975 7C16.975 7.6 16.575 8 15.975 8H6.37501L8.67501 10.3C9.07501 10.7 9.07501 11.3 8.67501 11.7C8.47501 11.9 8.17501 12 7.97501 12C7.77501 12 7.47501 11.9 7.27501 11.7L3.27501 7.7C3.17501 7.6 3.07501 7.5 3.07501 7.4Z"
            fill={color1}
        />
        <path
            d="M20.9 17.4C21 17.2 21 16.9 20.9 16.6C20.8 16.5 20.8 16.4 20.7 16.3L16.7 12.3C16.3 11.9 15.7 11.9 15.3 12.3C14.9 12.7 14.9 13.3 15.3 13.7L17.6 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H17.6L15.3 20.3C14.9 20.7 14.9 21.3 15.3 21.7C15.5 21.9 15.8 22 16 22C16.2 22 16.5 21.9 16.7 21.7L20.7 17.7C20.8 17.6 20.9 17.5 20.9 17.4Z"
            fill={color1}
        />
    </svg>
);

export default React.memo(Edit);
