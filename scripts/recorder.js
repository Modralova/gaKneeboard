
const path = require('path')
const fs = require('fs')
const util = require('util')
const webpackConfig = require('../webpack.config')


module.exports = class Recorder {


    constructor(params) {

        console.info("recorder params: ", {
        path: params.path
        })
        this.file = `.${params.path}`

        if (!fs.existsSync(params.path)){
            fs.mkdirSync(params.path, { recursive: true });
        }

    }

    write = (payload, options) => {
        
        let report = options.report
        let log = options.log
        let mode = options.mode
        if (log) {
            console.info("options: ", {
                mode: options.mode,
                log: log,
            })
        }

        if(report){

           

        switch (mode) {

           

            case "development":


                if (!fs.existsSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_DEV.json`))) {

                    fs.closeSync(fs.openSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_DEV.json`), 'w'));
                }

                fs.writeFileSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_DEV.json`), JSON.stringify(payload))
                break;

            case "production":

            

                if (!fs.existsSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_PRO.json`))) {

                    fs.closeSync(fs.openSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_PRO.json`), 'w'));
                }

                fs.writeFileSync(path.resolve(__dirname, `${this.file}/${new Date().toLocaleString().replace(/(\.|\, |:)/g, "")}_PRO.json`), JSON.stringify(payload))

                break;

            default:

                break;


        }

    }

        if (log) {

            console.log("webpackConfig: ", util.inspect(payload, { showHidden: false, depth: null, colors: true }))
        }

        return payload

    }

}

