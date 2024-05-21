
import csvFilePath from '../../assets/salaries.csv'
import Papa from 'papaparse'

const allowedFileTypes = ['csv']

export const parseCsv=()=>{
    console.log(csvFilePath)
    return new Promise((resolve, reject) => {
        if(!csvFilePath){
            console.log('No file selected')
            reject('No file selected')
        }
        const fileType = csvFilePath.split('.').pop()
        if(!allowedFileTypes.includes(fileType)){
            console.log('Invalid file type')
            reject('Invalid file type')
        }
        console.log('Parsing csv file')
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results) {
            resolve(results)
            },
            error: function(error) {
                reject(error)
            }
        })
    })
}
