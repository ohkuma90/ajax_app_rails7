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
  });
};

window.addEventListener('turbo:load', post);