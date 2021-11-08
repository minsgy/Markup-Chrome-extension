import React from "react";
import styled from "styled-components";

const LoadingIcon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

const Loading = ({ size = 24, loading = true, ...props }) => {
  const sizeStyle = {
    width: size,
    height: size,
  };

  return loading ? (
    <LoadingIcon>
      <svg
        style={sizeStyle}
        xmlnssvg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.0"
        width="64px"
        height="64px"
        viewBox="0 0 128 128"
        xmlSpace="preserve"
      >
        <g>
          <circle cx="16" cy="64" r="16" fill="#95afe7" />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#b8caef"
            transform="rotate(45,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#d3ddf5"
            transform="rotate(90,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#eaeffa"
            transform="rotate(135,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#f3f6fc"
            transform="rotate(180,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#f3f6fc"
            transform="rotate(225,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#f3f6fc"
            transform="rotate(270,64,64)"
          />
          <circle
            cx="16"
            cy="64"
            r="16"
            fill="#f3f6fc"
            transform="rotate(315,64,64)"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
            calcMode="discrete"
            dur="720ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </LoadingIcon>
  ) : null;
};

export default Loading;
