import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    // 돔 요소에 저장하는 변수에 이름을 붙일 때에는 앞에 $를 붙인다
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
