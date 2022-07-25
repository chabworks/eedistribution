if("undefined" == typeof jQuery){
	var jq = document.createElement("script");jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?fdfg=sd", document.getElementsByTagName("head")[0].appendChild(jq);
}
var jqryinvl = setInterval(function() { if("undefined" != typeof jQuery) {	clearInterval(jqryinvl);
window.website_domain ="eedistribution.com";
// for 200
window.sub_cat_urls=["https://www.eedistribution.com/hitlist.asp?eeshop=&spotlight=&searchfield=&SearchOrder=&company=&theme=&collect=&justone=0&new=5&clearance=0&premium=0&pref=0&nm=0&coming=&orsearch=0&wrid=0&sort=20&rpp=200&tree=0&instockcheck=on&pg="];

//for 20
// window.sub_cat_urls=["https://www.eedistribution.com/hitlist.asp?eeshop=&spotlight=&searchfield=&SearchOrder=&company=&theme=&collect=&justone=0&new=5&clearance=0&premium=0&pref=0&nm=0&coming=&orsearch=0&wrid=0&sort=20&rpp=20&tree=0&instockcheck=on&pg="];

window.current_request_stack=0;
window.allowed_request_stack=1;

window.category_pointer= 0; 
window.allowed_request_stack_backup=window.allowed_request_stack;

window.element_has_url='td .Link_LgBlue';
// window.end_at=1;

window.join_url='';
window.add_cat_url_slash=false;
window.start_at=1; 
window.pointer=0;
window.input_data=[];
window.export_json_obj=true;
window.start_product_scraping=false;
window.srcindex=0;
window.final_data=[];
window.backup_wait_thou_sec=10;
window.backup_instances=[];

window.all_DONE=false;

if (typeof window.available_inputs == 'undefined')
	window.available_inputs=[];


window.clean_text_format=function(inputext){return inputext.replace(/ +/g, ' ').replace(/(\r\n|\n|\r)/gm, "\n\n").replace(/[\n\n]+/g, "\n\n").replace(/\n\n /g, "\n\n").replace(/[\n\n\n]+/g, "\n\n").replace(/[\n\n]+/g, " ").replace(/[\t\t]+/g, " ").replace(/[\s\s]+/g, " ").trim()}
window.urlslasher=function(inputurl,type=false){inputurl=inputurl.replace(/\/?$/,'');var lastChar=inputurl.substr(-1);if(lastChar=='/'){inputurl=window.urlslasher(inputurl,type)}else{if(type){inputurl=inputurl+'/'}}
return inputurl}//window.urlslasher('https://ecample.com///',true)
var currentdate = new Date(); window.export_json_name = window.website_domain+" " + currentdate.getDate() + "_" + (currentdate.getMonth()+1)  + "_"  + currentdate.getFullYear() + "_at_"   + currentdate.getHours() + "_"   + currentdate.getMinutes() + "_"  + currentdate.getSeconds();
jQuery('body').html('<h1 style="color:Green;text-align:left;font-size:50px;margin-top:30px;margin-left:20px;position: sticky;top: 0;z-index: 9999999999999;background: #fff;" id="prod_log"></h1><h1 style="color:Green;text-align:right;font-size:50px;margin-top:30px;margin-right:20px;position: sticky;top: 0;z-index: 9999999999999;background: #fff;" id="cat_log"></h1>');/*Start_Data_Export*/
/*Start_Data_Export*/
window.final_backup = function(type){
	window.backup_instances.forEach(function(item,index){window.backup_instances[index] = false});
	var current_instnce=window.backup_instances.length;
	window.backup_instances[current_instnce] = true;
	setTimeout(function(){
		if(window.backup_instances[current_instnce]){
			var csv_string = '';
			var linetoadd='';
			var line='';
			for (var index in final_data[1]) {
				if(index!='undefined'){
			        if (line != '') line += ','
			        line +=index;
				}
			}
			csv_string += line + '\r\n';
			for (var i = 0; i < final_data.length; i++) {
			    var line = '';
			    for (var index in final_data[i]) {
			        if (line != '') line += ','
			        linetoadd=final_data[i][index]+'';
			    	linetoadd=linetoadd.split('\r\n').join('\n');
			    	linetoadd=linetoadd.split('"').join('""');
			    	if(linetoadd.includes(',') || linetoadd.includes('"'))
			        	line += '"'+linetoadd+'"';
			        else
			        	line += '"'+linetoadd+'"';
			    }
			    csv_string += line + '\r\n';
			}
			copyDataClipboard(csv_string);
			if(window.export_json_obj) downloadObjectAsJson('json',final_data,window.export_json_name);
		}
	},1000*window.backup_wait_thou_sec);
}
window.onbeforeunload=function(o){var e="Are you sure you want to close the Window?";return o.returnValue=e,e}; // acident window Close protection
window.downloadObjectAsJson = function(type,e, t) {
	if(typeof(t)=='undefined') t='demo';	
	if(type=='json'){
		var jsonse = JSON.stringify(e);
		var blob = new Blob([jsonse], {type: "application/json"});
	}
	else
		var blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]),e], {type: "text/csv"});
	var url  = URL.createObjectURL(blob);
        n = document.createElement("a");
    n.setAttribute("href", url);
    if(type=='json')
    	n.setAttribute("download", t + ".json");
	else
    	n.setAttribute("download", t + ".csv");
    document.body.appendChild(n), n.click(), n.remove();
}
window.copyDataClipboard = function(csv_string){
	downloadObjectAsJson('csv',csv_string,window.export_json_name);
}
/*End_Data_Export*/
window.splitArray = function(ary,slices){for(var t=[];ary.length;)t.push(ary.splice(0,slices));return t}

window.call_api_data = function (input_key){
	var output_key=input_key;	
	jQuery.ajax({
        type: "GET",
	    url: input_key,
	    crossDomain: true,
	    //dataType: "json", 
	    //data:{},
		beforeSend: function(request) {
			//request.setRequestHeader("Authority", '');
		},
		tryCount : 0,
    	retryLimit : 4,
	}).done(function(ajax_data,status,xhr){ 

		var dom_nodes = jQuery(jQuery.parseHTML(ajax_data));
		
			var to_be_push={};

			to_be_push['Page Url'] = '';
			to_be_push['Title'] = '';
			to_be_push['Item Number'] = '';
			to_be_push['Stock Level'] = '';
			to_be_push['Price per piece 1'] = '';
			to_be_push['Price per piece 2'] = '';
			to_be_push['Price per piece 3'] = '';
			to_be_push['UPC'] = '';

			var final_data_temp = [];			

			to_be_push['Page Url'] = this.url;
			to_be_push['Title'] = dom_nodes.find('h1.H1tag').text().trim();
		
			dom_nodes.find('font.SmBlack:contains(Item Number: )').find('*').prepend("\n")
			to_be_push['Item Number'] = dom_nodes.find('font.SmBlack:contains(Item Number: )').text().trim().replace('Item Number: ','').replace('Item Number:','').trim().split("\n")[0];
			to_be_push['Stock Level'] = dom_nodes.find('.SmBlackBold:contains(Stock Level)').parent().text().trim().replace('Stock Level:',"").replace('Stock Level: ',"").replace(':',"").trim();
			to_be_push['Price per piece 1'] = dom_nodes.find('td:contains("Price Per Piece"):last').parent().parent().parent().find('tr:nth-child(2) td:nth-child(3)').text().trim();
			to_be_push['Price per piece 2'] = dom_nodes.find('td:contains("Price Per Piece"):last').parent().parent().parent().find('tr:nth-child(3) td:nth-child(3)').text().trim();
			to_be_push['Price per piece 3'] = dom_nodes.find('td:contains("Price Per Piece"):last').parent().parent().parent().find('tr:nth-child(4) td:nth-child(3)').text().trim();
			to_be_push['UPC'] = dom_nodes.find("td:contains(UPC):last").next().text().trim();



					
			for (var key in to_be_push) {
			    if (to_be_push.hasOwnProperty(key)) {
			        to_be_push[key] = ''+to_be_push[key];
			    }
			}
			final_data_temp.push(Object.assign({}, to_be_push));
			final_data = final_data.concat(final_data_temp);	

			
			jQuery('#prod_log').text('Index: ' + window.srcindex + ' / ' +'Status: ' + window.final_data.length + ' / ' + input_data.length);				
			if(window.srcindex>input_data.length-1){console.log('ALL done')};
			if(window.srcindex>input_data.length-1){window.all_DONE=true;}					
					
			setTimeout(function(){		
				window.current_request_stack--;	
			},2250);	
	}).fail(function(xhr, textStatus, errorThrown){
            setTimeout(function(){		
				window.current_request_stack--;	
			},2250);
	});
}
window.trackindex=0
window.reset=setInterval(function(){
	if(window.start_product_scraping && window.current_request_stack < window.allowed_request_stack){
		window.current_request_stack++;

		window.call_api_data(input_data[window.srcindex] , '');
		window.srcindex++;

		if(window.srcindex>input_data.length-1) clearInterval(window.reset)
	}
},100);

// restart()
window.restart = function() {
	window.srcindex--;
	window.current_request_stack=0;	
	window.allowed_request_stack = window.allowed_request_stack_backup;
		console.error('Script restarted!, Please wait...');
}
// pause()
window.pause = function() {	
	window.allowed_request_stack=0;
	var temp_cheker=setInterval(function(){
		if (window.current_request_stack==0) {
			clearInterval(temp_cheker)
			console.log('Script Paused');
		}
	},1000)
}
/*Start Scrape URL*/
window.sub_cat_urls.forEach(function(cat_urls, index) {
  window.sub_cat_urls[index] = window.urlslasher(cat_urls,window.add_cat_url_slash);
});
function get_input_urls(){
page_url=window.sub_cat_urls[window.category_pointer]+'';
	jQuery.ajax({
        type: "GET",
	    url: page_url,
	    crossDomain: true,	    
		tryCount : 0,
    	retryLimit : 4,
	}).done(function(mainpage_res){

		var mainpage_res_html = jQuery(jQuery.parseHTML(mainpage_res));

			function get_input_urls_inner(pointer){
				var	page_url=window.sub_cat_urls[window.category_pointer]+''+pointer;

				jQuery.ajax({
			        type: "GET",
				    url: page_url,
				    crossDomain: true,				    
					tryCount : 0,
			    	retryLimit : 4,
				}).done(function(products_res,status,xhr){

					jQuery('#cat_log').text('Category Status: ' + (pointer) + ' / ' +(window.category_pointer+1) + ' / ' + window.sub_cat_urls.length);


					var products_html = jQuery(jQuery.parseHTML(products_res));
					var products_ary = products_html.find(window.element_has_url);					

					products_ary.each(function(e){
						var product_link=this.href;
						if(window.input_data.indexOf(product_link) === -1)
							window.input_data.push(product_link);
					});

					pointer++;
					if(products_ary.length>0 && products_html.find('.Link_SmOrangeBold:contains("NEXT")').length == 0){//&& pointer<totalpages+1  && pointer<=window.end_at
						get_input_urls_inner(pointer);
					}else if(window.sub_cat_urls.length-1> window.category_pointer){
						window.category_pointer++;
						get_input_urls();

					}else{
						if(window.input_data.length>0)
						{
							setTimeout(function(){
								window.start_product_scraping=true;
							},1000)
						}
					}
				}).fail(function(xhr, textStatus, errorThrown){
			            this.tryCount++;
			            if (this.tryCount <= this.retryLimit) {
			                get_input_urls_inner(pointer);
			                return;
			            }else{
			            	console.log('retryLimit crossed for '+ this.url);
			            	jQuery("#errors").val(jQuery("#errors").val() +"\n"+'retryLimit crossed for '+ this.url);
			            	return;
			            }
				});	
			}
			get_input_urls_inner(window.start_at);
			/*END Scrape URL*/
	}).fail(function(xhr, textStatus, errorThrown){
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                get_input_urls();
                return;
            }else{
            	console.log('retryLimit crossed for '+ this.url);
            	jQuery("#errors").val(jQuery("#errors").val() +"\n"+'retryLimit crossed for '+ this.url);
            	return;
            }

	});
}

jQuery.ajax({
        type: "POST",
	    url: 'https://www.eedistribution.com/wscheckin.asp?pg=1',
	    data:{"skip_redirect": "1","custnum": "3965472","password": "Welcome123$#$","x": "17","y": "22"}
	}).done(function(products_res,status,xhr){
			get_input_urls();	
	});	
/*END Scrape URL*/

setInterval(function() {
	jQuery.ajax({
        type: "POST",
	    url: 'https://www.eedistribution.com/wscheckin.asp?pg=1',
	    data:{"skip_redirect": "1","custnum": "3965472","password": "Welcome123$#$","x": "17","y": "22"}
	})
},45000)


/*OUR CODE ENDS*/
} },500);
