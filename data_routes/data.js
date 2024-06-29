// lib/data.js
const xlsx = require('xlsx');
const fs = require('fs');

function extractDataFromSheet(sheet) {
    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    let extractedData = [];
    jsonData.forEach(row => {
        if (row.length > 0) {
            extractedData.push({
                gate: row[0],
                routeNo: row[1],
                routeName: row[2],
                vendor: row[3],
                order: row[4]
            });
        }
    });
    extractedData.splice(0, 2);
    return extractedData;
}

function splitValuesToArray(extractedData) {
    const result = [];
    for (const item of extractedData) {
        const key = Object.keys(item)[0];
        const value = item[key];
        if (typeof value === 'string') {
            result.push({ [key]: value.split(',') });
        } else {
            result.push({ [key]: value });
        }
    }
    return result;
}

function extractDataFromSheet2(sheetData) {
    const dataRange = sheetData['!ref'].split(':');
    const [startCell, endCell] = dataRange;
    const [startColumn, startRow] = startCell.match(/[A-Z]+|\d+/g);
    const [endColumn, endRow] = endCell.match(/[A-Z]+|\d+/g);

    let extractedData = [];
    let currentHeader = '';

    const getNextColumn = (column) => {
        const lastChar = column.slice(-1);
        if (lastChar === 'Z') {
            return column.slice(0, -1) + 'AA';
        } else {
            return column.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1);
        }
    };

    for (let row = parseInt(startRow); row <= parseInt(endRow); row++) {
        const columnHeaderCell = startColumn + row;
        const columnHeader = sheetData[columnHeaderCell]?.v;
        if (columnHeader) {
            currentHeader = columnHeader;
        }

        for (let col = getNextColumn(startColumn); col <= endColumn; col = getNextColumn(col)) {
            const cell = col + row;
            const cellData = sheetData[cell];
            let value = '';

            if (cellData && cellData.v !== undefined) {
                value = cellData.v;
            }

            if (row > parseInt(startRow)) {
                if (currentHeader && value.trim() !== '' && currentHeader !== 'LOCATION' && value !== 'ROUTE NUMBERS') {
                    let rowData = {};
                    rowData[currentHeader] = value;
                    extractedData.push(rowData);
                }
            }
        }
    }
    return splitValuesToArray(extractedData);
}

function extractDataFromSheet3(sheetData) {
    const result = [];
    const numRows = sheetData['!ref'].split(':')[1].match(/\d+/)[0];
    for (let i = 3; i <= numRows; i++) {
        const row = {};
        row['ROUTE NAME'] = sheetData[`A${i}`].v.trim();
        row['ORDER'] = sheetData[`B${i}`].v;
        row['GATE'] = sheetData[`C${i}`].v;
        result.push(row);
    }
    return result;
}

function extractDataFromSheet4(sheet) {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const filteredData = data.filter(row => row.some(cell => cell !== ''));
    const routes = {};
    let currentRoute = '';
    for (let i = 0; i < filteredData.length; i++) {
        const row = filteredData[i];
        if (row[0] && typeof row[0] === 'string' && row[0].startsWith('BUS ROUTE NO')) {
            currentRoute = row[0];
            if (!routes[currentRoute]) {
                routes[currentRoute] = [];
            }
        } else {
            if (currentRoute && routes[currentRoute]) {
                const sno = parseInt(row[0]);
                if (!isNaN(sno) && row[0] !== 'SL.NO.') {
                    routes[currentRoute].push({
                        'SL.NO.': sno,
                        'NAME OF THE STOPPING': row[1],
                        'TIME A.M': row[2]
                    });
                }
            }
        }
    }
    const renamedRoutes = {};
    for (const key in routes) {
        if (Object.prototype.hasOwnProperty.call(routes, key)) {
            const routeNumberAndLocation = key.replace('BUS ROUTE NO:', '').trim();
            renamedRoutes[routeNumberAndLocation] = routes[key];
        }
    }
    return renamedRoutes;
}

function extractDataFromSheet5(sheetData) {
    const extractedData = {};
    const Name1 = sheetData.A2.v;
    const Phone1 = sheetData.B2.v;
    const Phone2 = sheetData.C2.v;
    extractedData[Name1] = [Phone1, Phone2];
    const Name2 = sheetData.A3.v;
    const Phone3 = sheetData.B3.v;
    const Phone4 = sheetData.C3.v;
    extractedData[Name2] = [Phone3, Phone4];
    return extractedData;
}

function DataExtraction(filePath, filePath2) {
    const fileData = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileData, { type: 'buffer' });
    let sheets = [];
    sheets[0] = extractDataFromSheet(workbook.Sheets[workbook.SheetNames[0]]);
    sheets[1] = extractDataFromSheet(workbook.Sheets[workbook.SheetNames[1]]);
    sheets[2] = extractDataFromSheet2(workbook.Sheets[workbook.SheetNames[2]]);
    sheets[3] = extractDataFromSheet(workbook.Sheets[workbook.SheetNames[3]]);
    sheets[4] = extractDataFromSheet3(workbook.Sheets[workbook.SheetNames[4]]);
    const fileData2 = fs.readFileSync(filePath2);
    const workbook2 = xlsx.read(fileData2, { type: 'buffer' });
    sheets[5] = extractDataFromSheet4(workbook2.Sheets[workbook2.SheetNames[0]]);
    sheets[6] = extractDataFromSheet4(workbook2.Sheets[workbook2.SheetNames[1]]);
    sheets[7] = extractDataFromSheet4(workbook2.Sheets[workbook2.SheetNames[2]]);
    sheets[8] = extractDataFromSheet4(workbook2.Sheets[workbook2.SheetNames[3]]);
    sheets[9] = extractDataFromSheet5(workbook2.Sheets[workbook2.SheetNames[4]]);
    return sheets;
}

module.exports = { DataExtraction };