import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const routePath = useLocation();

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };

    toTop();
  }, [routePath]);

  return null;
};

export default ScrollTop;
