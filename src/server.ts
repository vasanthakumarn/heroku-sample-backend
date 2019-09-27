import express = require('express');
const libreOfficeConvert = require('libreoffice-convert');
const exec = require('child_process').exec;

const fs = require('fs');
const path = require('path');
const server = express();
const outputFileName = 'Sample2';
const extend='.pdf';

server.get('/', (request: express.Request, response: express.Response) => {
	const randomName = new Date().getTime();
	const enterPath = path.join(__dirname, '..',`${outputFileName}.docx`);
       const outputPath = path.join(__dirname, `${outputFileName}.pdf`);
       const readEnterPath = fs.readFileSync(enterPath);
	   console.log('READ ENTER PATH ', readEnterPath);
	
	const child = exec(`soffice --headless --convert-to pdf --outdir . ${enterPath}`, (err: any, result: any) => {
           console.log('libreOfficeConvert....');
           if (err) {
               console.log(`Error converting file: ${err}`);
               return  {filePath: '', pdfFileName: ''};
           }
           console.log('result.....', result);
           if (result) {
               //fs.writeFileSync(path.resolve(__dirname , `${randomName}.pdf`), result);
               console.log('__dirname   ', __dirname);
               console.log('outputFileName   ', randomName);
               return response.status(200).sendFile(outputPath, '',  (error: any) => {
                   if (error) {
                       console.log(error);
                   } else {
                       /*fs.unlinkSync(`${__dirname}\\${outputFileName}.docx`);
                       fs.unlinkSync(`${__dirname}\\${outputFileName}.pdf`);*/
                   }
               });
           } else {
               return  {filePath: '', pdfFileName: ''};
			   response.status(200).send('hello world - sample-heroku!!!');
           }
       });
    //response.status(200).send('hello world - sample-heroku!!!');
});
console.log('Server is listening...');
module.exports = server.listen(process.env.PORT || 3000);
