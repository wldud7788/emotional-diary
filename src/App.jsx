import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import { createContext, useMemo, useReducer, useRef } from "react";
import MOCKDATA from "./util/mock";

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
export const DiaryDIspatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, MOCKDATA);
  const idRef = useRef(3);

  // 새로운 일기 추가
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
  // 기존 일기 수정
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
  // 기존 일기 삭제
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
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDIspatchContext.Provider value={memoized}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDIspatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
