# README

ページは3つ作成
・/todos (TodoListコンポーネント)
・/todos/new (AddTodoコンポーネント)
・/todos/:id/edit (EditTodoコンポーネント)

画面遷移を行わない仕組み
javascript/packs/index.jsのAppコンポーネントを、
views/site/index.html.erbにマウントし、
Appコンポーネント内で、URLに応じて表示するコンポーネントを切り替えできるよう設定

TodoListコンポーネントにて
・todos#indexにアクセスし、データを取得
・todos#updateにアクセスし、データの更新(完了チェック)
・todo#destroy_allにアクセスし、データの一括削除

AddTodoコンポーネントにて
・todos#createにアクセスし、データを作成

EditTodoコンポーネントにて
・todos#showにアクセスし、データを取得
・todos#updateにアクセスし、データの更新(名前の更新)
・todo#destroyにアクセスし、データの削除
