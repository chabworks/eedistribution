const fs = require("fs");
const puppeteer = require("puppeteer");

const glob = require("glob");

const iPhone = puppeteer.devices['iPhone 6'];


//const request=require('request')
//const csv=require('csvtojson')
const converter = require('json-2-csv');
//const download = require('download');

mailer = require('nodemailer');
var date = new Date();
var start_date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();                
var start_time = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds();        




var shell = require('shelljs');
shell.exec('taskkill /f /im chrome.exe & ver > nul')


const buffers = fs.readFileSync("inject.js");
const inject_js = buffers.toString();

const todayDate = new Date().toISOString().slice(0, 10);


// Asynchronous version
fs.unlink('data/'+todayDate+'.json', function(err) {
    if(!err) {
        console.log('File deleted '+'data/'+todayDate+'.json');
    }    
})

// console.log(''adadad);



// options is optional
glob("screenshots/*.jpeg", {}, function (er, files) {
    for (const file of files) {
         fs.unlink(file, function(err) {
            if(!err) {
                console.log('File deleted '+file);
            }    
        })
    }
});
// console.log(inject_js);
console.log('\nScript is initiating. Please Wait..!\n');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function captureScreenshot() {
  // if screenshots directory is not exist then create one
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }


  let browser = null;


 let user_data_dir = './myUserDataDir';

    if (!fs.existsSync(user_data_dir)){
        fs.mkdirSync(user_data_dir);
    }


  try {

    const all__proxies_buffers = fs.readFileSync("webshare.txt",'utf8');
    const all__proxies_inject_js = all__proxies_buffers.replace(/\r?\n/g, "\n").split("\n");
    let all__proxies = [];
    let choosen_proxy='';
    let _next_proxy_read_index_smartproxy = 0;
    // _next_proxy_read_index_smartproxy = parseInt(await fs.readFileSync('_next_proxy_read_index_smartproxy','utf8'));




    _next_proxy_read_index_smartproxy = Math.floor(Math.random() * (all__proxies_inject_js.length - 1 + 1)) + 0;


    // _next_proxy_read_index_smartproxy = 0;
    if (all__proxies_inject_js.length)
      all__proxies = all__proxies_inject_js

if (all__proxies.length)
        choosen_proxy = all__proxies[_next_proxy_read_index_smartproxy];



    let browser_args = ['--window-size=1366,768',
        '--disable-gpu','--no-sandbox', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'  , '--allow-running-insecure-content',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--disable-infobars' 
    ];

    if (choosen_proxy) {
        browser_args.push('--proxy-server=http://p.webshare.io:80');
    }


    browser = await puppeteer.launch({
        headless:true,
        userDataDir:user_data_dir,
        ignoreHTTPSErrors: true,
        slowMo: 0,
        waitUntil: 'load',
        timeout: 0,
        args: browser_args
    });


    // create new page object
     const page = await browser.newPage({context: `${Math.random()}`});




        console.log('choosen_login: ' + choosen_proxy)

        let choosen_proxy_login = choosen_proxy.split(':')

    
    await page.authenticate({username:choosen_proxy_login[0],password:choosen_proxy_login[1]});
    await page.goto("https://www.eedistribution.com", {waitUntil: 'load', timeout: 0});
    // await page.goto("https://showmyip.com", {waitUntil: 'load', timeout: 0});



    // set viewport width and height
    // await page.setViewport({ width: 1920, height: 1080 });
    // await page.emulate(iPhone);

    // await page.goto("https://www.google.com/");

    // capture screenshot and store it into screenshots directory.
    // var idsd=0;
    // setInterval(function(){
    //  idsd++;
    //  page.screenshot({ path: 'screenshots/github-profile'+idsd+'.jpeg' });
    // },1000);








   // await new Promise(resolve => setTimeout(resolve, 600000));

await page.evaluate(inject_js);

// await page.evaluate(() => {
//   const inter = setInterval(function () {
//     clearInterval(inter);
//     if("undefined" != typeof jQuery) {
//       return Promise.resolve(true);
//     }else{
//       return false;
//     }          
//   },2000);

// }).then(function (resolved) {
//   console.log(resolved);
// });

// await page.waitForFunction('"undefined" != typeof jQuery').then(function () {
//       console.log('jQuery loaded');
//     });

for (let i = 0;true;i++) {
   result = await page.evaluate(() => {
     if(window.all_DONE){
       return {"first":true,second:window.final_data};
     }else{
       if ("undefined" != typeof  window.final_data && "undefined" != typeof  window.srcindex) {
         return {"first":'Page: ' + window.srcindex + ', Offers: ' + window.final_data.length,second:''};
       }else{
         return {"first":false,second:''};
       }

     }
   });
   
   if (typeof result["first"] == 'boolean' && result["first"]) {

     let jsonstr = JSON.stringify(result["second"]);
     
     // var visited_pages = final_data.length;

     fs.writeFileSync('data/'+todayDate+'.json', jsonstr);
     console.log("\n\n"+'Success! File Exported to: '+'data/'+todayDate+'.json'+"\n\n");
     // console.log(jsonstr);

     let json2csv = require("json2csv");
      const csv_data = JSON.parse(fs.readFileSync('data/'+todayDate+'.json'));

      converter.json2csv(csv_data, (err, csv) => {
          if (err) {
              throw err;
          }
          // write CSV to a file
          fs.writeFileSync(todayDate+'.csv', csv);
          console.log("\n"+'Success! File Exported to: '+todayDate+'.csv'+"\n");          
      });
      /*CSV Convert*/


        if(result["second"].length){

			console.log('called')

            




        }







     break;
   }else{
     console.log(result["first"]);
   }




   await new Promise(resolve => setTimeout(resolve, 600));
   // await new Promise(resolve => setTimeout(resolve, 500));
   // let temper = ''+i;
   // await page.screenshot({ path: 'screenshots/'+temper+'.jpeg' });

   if(i>1000000) break;
  }



   smtpProtocol = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "lokesh8545156660@gmail.com",
            pass: "igwplkehqbwtgmtb"
        }
    });


    var date = new Date();
    var end_date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();                
    var end_time = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds();        

    var mailoption = {
        from: "sender@gmail.com",
        to: "johnlinda0301@gmail.com",
        subject: "Eedistribution Bot Run Successfully | "+' Scrape '+' Date | '+start_date,
        html: '<div id="email" style="width:600px;margin: auto;background:white;">  <table role="presentation" border="0" width="100%">      <tbody><tr>                <td bgcolor="#EAF0F6" align="center" style="padding: 30px 30px;">          <h2 style="font-size: 28px;margin:0 0 20px 0;font-family:Avenir;font-size: 39px;font-size: 2.4rem;color: #005a8c;font-weight: 700;text-transform: uppercase;font-family: Oswald,Helvetica,Arial,sans-serif;line-height: 1.3;display: block;"> Eedistribution BOT </h2>                   <p style="margin:0 0 12px 0;font-size:20px;line-height:24px;font-family:Avenir">Eedistribution Bot Successfully visited all the pages.</p> <ul style="text-align: left;font-size: 17px;">            <li>Scrape Date : '+start_date+'</li>                                 </ul>         </td>          </tr>  </tbody></table>   <!-- Footer -->  <table role="presentation" border="0" width="100%" cellspacing="0">      <tbody><tr>          <td bgcolor="#F5F8FA" style="padding: 30px 30px;">            <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color: #99ACC2; font-family:Avenir; text-align: center;"> Mail Generated at: '+end_date+' '+end_time+' </p>           </td>          </tr>      </tbody></table> </div>',
        // html: '<div id="email" style="width:600px;margin: auto;background:white;">  <table role="presentation" border="0" width="100%">      <tbody><tr>                <td bgcolor="#EAF0F6" align="center" style="padding: 30px 30px;">          <h2 style="font-size: 28px;margin:0 0 20px 0;font-family:Avenir;font-size: 39px;font-size: 2.4rem;color: #005a8c;font-weight: 700;text-transform: uppercase;font-family: Oswald,Helvetica,Arial,sans-serif;line-height: 1.3;display: block;"> Eedistribution BOT </h2>                   <p style="margin:0 0 12px 0;font-size:20px;line-height:24px;font-family:Avenir">Eedistribution Bot Successfully visited all the pages using a '+' device_name '+' user agent.</p>          <h3 style="text-align: left;"> Progress Report: </h3>          <ul style="text-align: left;font-size: 17px;">            <li>Start Date &amp; Time: '+start_date+'</li>            <li>Total Scraped Pages: '+visited_pages+'</li>                        <li>End Date &amp; Time: '+end_date+' '+end_time+'</li>          </ul>         </td>          </tr>  </tbody></table>   <!-- Footer -->  <table role="presentation" border="0" width="100%" cellspacing="0">      <tbody><tr>          <td bgcolor="#F5F8FA" style="padding: 30px 30px;">            <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color: #99ACC2; font-family:Avenir; text-align: center;"> Mail Generated at: '+' end_date '+' '+end_time+' </p>           </td>          </tr>      </tbody></table> </div>',
        attachments: [
            {   // utf-8 string as an attachment
                filename: todayDate+'.csv',
                path: todayDate+'.csv' // stream this file
            }
        ]

        // html: 'Eedistribution Bot Runs Successfully on '+ formarteddate + ' ' + formartedtime
    }

    smtpProtocol.sendMail(mailoption, function(err, response){
        if(err) {
            console.log(err);
        } 
        console.log('Message Sent => ' + response.response);
        smtpProtocol.close();
    });


  // await page.evaluate(() => {
  //   var jq = document.createElement("script")
  //   jq.setAttribute('type','text/javascript');
  //   jq.src = "https://code.jquery.com/jquery-3.2.1.min.js"
  //   return new Promise( (resolve) => {
  //       jq.addEventListener("load", ()=> {
  //           resolve();
  //       });
  //       document.getElementsByTagName("head")[0].appendChild(jq);
  //   });
  // })
  //   const watchDog = page.waitForFunction('window.jQuery !== undefined');
  //   await watchDog;


   await new Promise(resolve => setTimeout(resolve, 20000));


    // await page.screenshot({ path: 'screenshots/'+makeid(5)+'.jpeg' });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    await browser.close();
    process.exit();
    console.log(`\n ALL Done!`);
  }
}

captureScreenshot();
