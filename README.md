### 감정일기 
작업 날짜: 2025.01.15 ~ 2025.01.18 <br>
벨로그 : [벨로그 링크](https://velog.io/@rooftop7788/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B82-Emotional-Diary)  <br>
배포링크: https://pokemon-indol-three.vercel.app/  <br>

### [DiaryContext.jsx]
- ContextAPI
	DiaryStateContext와 DiaryDispatchContext로 상태와 상태 변경 함수 관리, 컴포넌트 트리 내에서 일기 데이터와 관련된 함수를 쉽게 공유
    
- 리듀서 함수
	리듀서 함수를 사용하여 상태관리

- useRef훅 
	useRef 훅을 사용하여 새로운 일기를 생성할 때 사용할 ID관리
    idRef.curreent는 현재 id값을 유지하며, 새로운 일기가 생성될 때마다 증가

- 최적화
	useMemo훅을 사용하여 onCreate,onUpdate, onDelete함수를 메모제이션하여, 함수들이 초기화된 후에는 재성성되지 않도록 하여 성능을 최적화 
    이로인해 불필요한 렌더링을 방지
- Context Provider
	DiaryProvider 컴포넌트는 DiaryStateContext.Provider와 DiaryDispatchContext.Provider를 사용하여 자식 컴포넌트에 상태와 함수를 제공 children prop을 통해 이 Provider를 감싸는 모든 컴포넌트가 이 상태와 함수에 접근 가능

### [홈 화면]
![](https://velog.velcdn.com/images/rooftop7788/post/179bbdab-3a32-4e11-8605-fc0869466d8b/image.png)

### [다이어리 화면]
![](https://velog.velcdn.com/images/rooftop7788/post/435770b0-8542-44fd-a395-d40d9ed2d168/image.png)

- 로딩 상태처리
	curDiaryItem이 아직 로딩중이거나 유효하지 않은 경우 로딩 메시지를 표시

- 날짜 포맷팅
	const title = getStringedDate(new Date(createDate));
    createDate를 Date객체로 변환 후 이를 문자열으로 변환하여 제목으로 사용
    getStringedDate함수를 사용하여 사람이 읽기 쉬운 형식으로 변환
### [새로운 일기 쓰기]

![](https://velog.velcdn.com/images/rooftop7788/post/75016bdf-5102-4a02-bc41-a0256e7cdc44/image.png)

- usePageTitle훅을 사용
	현재 페이지의 제목을 새일기 쓰기로 설정
- 제출 처리 함수
	input매개변수를 받아 onCreate함수 호출(날짜를 밀리초로 변환하여 전달)
- repalce: true를 사용하여 뒤로가기 방지
### [수정하기 화면]
![](https://velog.velcdn.com/images/rooftop7788/post/0a8208b2-3ac2-420a-b448-d2d277b41de3/image.png)

- 입력 변화 처리
	onChangeInput함수를 사용하여 입력 필드의 값이 변경될 때 호출
	e.target.name을 통해 어떤 필드가 변경되었는지 확인하고 해당 값을 없다잍, 만약 변경된 필드가 createDate라면 값을 Date객체로 반환
```jsx
const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };
```
- 제출 버튼 클릭 처리 
	제출 버튼 클릭 시 onClickSubmitButton함수호출 
    현재 입력 상태인 input을 매개변수로 전달 
    
    
### 다이어리 리스트 출력 옵션(최신순, 오래된 순)
```jsx
const [sortType, setSortType] = useState("");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      // a-b가 1이면 오름차순
      // a-b가 -1이면 내림차순
      // a-b는 기본적으로 오름차순 정렬을 의미
      if (sortType === "oldest") {
        return Number(a.createDate) - Number(b.createDate);
      } else {
        return Number(b.createDate) - Number(a.createDate);
      }
    });
  };
```
- getSortedDate함수를 통해 선택된 정렬 기준에 따라 다이어리 목록 정렬
