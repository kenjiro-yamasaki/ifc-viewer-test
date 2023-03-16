const path = require('path');
module.exports = {
    // モジュールバンドルの起点となるファイルを指定します。
    entry: {
        bundle: './src/main.ts'
    }, 

    output: {
        // モジュールバンドルの出力する場所（ディレクトリ・ファイル名）を指定します。
        // 「__dirname」はこのファイルが存在するディレクトリを表します。
        // 「[name]」は「entry」で記述した名前（ここでは「bundle」）を表します。
        path: __dirname,
        filename: '[name].js'
    },

    // モジュールとして扱いたいファイルの拡張子を指定します。
    // 例えば「import Foo from './foo'」という記述に対して「foo.ts」という名前のファイルをモジュールとして探します。
    resolve: {
        extensions:['.ts','.js']
    },
    
    // モジュールに適用するルールを設定します。
    module: {
        rules: [
            {
                // 拡張子が .ts で終わるファイルに対して、TypeScriptコンパイラを適用します。
                test:/\.ts$/,loader:'ts-loader'
            }
        ]
    }
}