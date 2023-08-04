function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonres = await res.json();
  //jsonres = [{id:"", content:""}]
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonres.foreach(displayMemo);
  // 배열로 저장된 jsonres 값에 각각 displayMemo라는 함수를 실행
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    // default : get(조회) 요청
    method: "POST", // Create를 해야 하기 때문에 POST로 변경
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 문자열로 바꾸는 코드
      id: new Date().getTime(),
      content: value,
    }),
  });

  readMemo();
}

function handleSubmit(event) {
  event.preventDefault(); // submit 이벤트는 눌러짐과 동시에 새로고침을 실행하기 때문에 값을 확인할 수 없음.
  //그것을 방지하기 위한 코드
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit); //form에 있는 값이 제출됐을 때 발생하는 이벤트

readMemo();
