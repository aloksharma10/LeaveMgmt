import React from "react";
import { BiSolidNetworkChart } from "react-icons/bi";
function Logo({ size, ...props }) {
  return <BiSolidNetworkChart className="mx-2" size={size} {...props} />;
}

export default Logo;
