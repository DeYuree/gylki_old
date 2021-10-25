import XLSX from 'xlsx'

const collectManualData = (formInputs) => {
    //collect manual data
    let manualData = []
    
    for(let key in formInputs) {
        let val = formInputs[key].finalData
        if(val) manualData.push(val)
    }
    
    // console.log(manualData)
    // remove all null elems
    let manualDataClean = manualData.filter( item => {
        let itemChecked = Object.keys(item).every( key => {
            return (item[key] != null || key !== 'undefined')
        })
        return (itemChecked == true) ? item : ''
    })
    
    // console.log(manualDataClean)

    //check correct val
    let count = 0, curVal = 0, curKeyVal = 0

    //check if repeate values in manualData
    for(let item in manualDataClean) {
        if(Object.values(manualDataClean[item]).includes(curVal)) {count++}
        curVal = Object.values(manualDataClean[item])[0]
        
        if(Object.keys(manualDataClean[item]).includes(curKeyVal)) {count++}
        curKeyVal = Object.keys(manualDataClean[item])[0]
    }

    //if yes - break
    if(count > 0) {
        let message = {
            mainText: "Ошибка!",
            extraText: 'Проверьте введенные данные',
            color: 'red lighten-1',
            icon: 'fas fa-minus-circle'
        }
        this.clearMessage()

        setTimeout(() =>
            this.INIT_MESSAGE(message)
        , 400)

        return
    }

    //if no - next
    else {
        return manualDataClean
    }			
}

const newFunc2 = () => {
    console.log("test2")
}

const readXMLfromURL = (url) => {

    var xmlDoc = null // <- Here your XML file

    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'document'
    xhr.overrideMimeType('text/xml')
    xhr.onload = function () {
        // Request finished. Do processing here.
        if (xhr.status!=200) {
            console.log('err')
        }
        else {
            xmlDoc = this.responseXML // <- Here your XML file
        }
    }

    xhr.send(null)

    return xmlDoc
}

const readXLSX = (callback, file) => {
    
    // var workbook = XLSX.readFile(file)
    // // var workbook = XLSX.read(file, {type:'array'})

    // const result = {}

    // workbook.SheetNames.forEach(function(sheetName) {
    //     let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1})
    //     if(roa.length) result[sheetName] = roa
    // })

    // return result



    let reader = new FileReader()
        reader.onload = function(e) {
            let data = file
            let workbook = XLSX.read(data, {type:'array'})
            // console.log(workbook)

            const result = {}

            //for one sheet
            // let roa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1})
            // if(roa.length) result[workbook.SheetNames[0]] = roa 

            //for all sheets
            workbook.SheetNames.forEach(function(sheetName) {
                let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1})
                if(roa.length) result[sheetName] = roa
            })

            // console.log(result)
            callback(null, result)
        }
        
        reader.onerror = () => callback(new Error(`Не удалось загрузить ${file}`))

        reader.readAsArrayBuffer(file)
}

export default {
    collectManualData,
    readXMLfromURL,
    readXLSX
}