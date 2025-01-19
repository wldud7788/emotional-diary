import { createContext, useMemo, useReducer, useRef } from "react";
import MOCKDATA from "../util/mock";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, MOCKDATA);
  const idRef = useRef(3);

  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (targetId, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      id: targetId,
    });
  };

  const memoized = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoized}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};
