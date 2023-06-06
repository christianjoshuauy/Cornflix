import { useState, useEffect } from "react";

function useScroll(heightLimit) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function checkScroll() {
      window.scrollY > heightLimit ? setIsScrolled(true) : setIsScrolled(false);
    }

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [heightLimit]);

  return isScrolled;
}

export default useScroll;
