import React from "react";
import { CustomButtonContainer } from "./Button.style";

function Button({ children, ...props }) {
  return (
    <CustomButtonContainer {...props}>
      <p>{children}</p>
    </CustomButtonContainer>
  );
}

export default Button;
