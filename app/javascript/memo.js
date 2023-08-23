const buildHTML = (XHR) => {
  // itemにレスポンスの内容post（コントローラーから送られたやつ）を代入、
  const item = XHR.response.post;
  // htmlに反映させる情報を代入
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  // 出来たhtmlをリターンする
  return html;
};

function post (){
  // id="form"の取得
  const form = document.getElementById("form");
  // submitおされた時の処理を定義,e(イベントオブジェクト)を引数に入れてる。
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // formに記述された内容をfomDataオブジェクトに代入
    const formData = new FormData(form);
    // サーバーとhttp通信します
    const XHR = new XMLHttpRequest();
    // XHRのリクエストの内容を指定
    XHR.open("POST", "/posts", true);
    // XHRのレスポンスの内容を指定
    XHR.responseType = "json";
    // formDataを持ってリクエスト送信
    XHR.send(formData);
    // リクエストの送信が成功した時の処理を記述
    XHR.onload = ()=> {
      // レスポンスに何かしら問題があった時の条件分岐
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      // list要素の取得
      const list = document.getElementById("list");
      // フォームのテキストフィールドを取得
      const formText = document.getElementById("content");
      // buildHTMLを呼び出しhtml作り、挿入箇所をlistの直後に指定して挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('turbo:load', post);