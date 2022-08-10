// if("undefined" == typeof jQuery){
	var jq = document.createElement("script");jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?fdfg=sd", document.getElementsByTagName("head")[0].appendChild(jq);
// }
var jqryinvl = setInterval(function() { if("undefined" != typeof jQuery) {	clearInterval(jqryinvl);
window.website_domain ="regowholesale.com";
// for 200
window.sub_cat_urls=["https://regowholesale.com/collections/all"];

//for 20-
// window.sub_cat_urls=["https://www.eedistribution.com/hitlist.asp?eeshop=&spotlight=&searchfield=&SearchOrder=&company=&theme=&collect=&justone=0&new=5&clearance=0&premium=0&pref=0&nm=0&coming=&orsearch=0&wrid=0&sort=20&rpp=20&tree=0&instockcheck=on&pg="];

window.current_request_stack=0;
window.allowed_request_stack=4;

window.category_pointer= 0; 
window.allowed_request_stack_backup=window.allowed_request_stack;

window.element_has_url='.product-list--collection .inventory--high:contains(In stock)';
// window.end_at=2;

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

window.call_api_data = function (input_key,trycounter=0){
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

		// var dom_nodes = jQuery(jQuery.parseHTML(ajax_data));
			if (jQuery(ajax_data).filter('script[type="application/ld+json"]:contains(: "Product",)').length != 0) {

				var json_data = JSON.parse(jQuery(ajax_data).filter('script[type="application/ld+json"]:contains(: "Product",)').get(0).innerText);
				
				
					var to_be_push={};

					to_be_push['Page Url'] = '';
					to_be_push['Title'] = '';
					to_be_push['SKU'] = '';
					to_be_push['Price'] = '';
					

					var final_data_temp = [];			

					// to_be_push['Title'] = json_data['name'];
				
					// to_be_push['Page Url'] = this.url;
					// to_be_push['Title'] = dom_nodes.find('h1.product-meta__title.heading.h1:first').text().trim();
					// to_be_push['SKU'] = dom_nodes.find('.product-meta__sku-number:first').text().trim();
					// to_be_push['Price'] = dom_nodes.find('.product-form__info-content .price.price--highlight:first').text().trim();


					to_be_push['Page Url'] = this.url;
					
					if (typeof json_data['name'] != 'undefined' && json_data['name']) {
						to_be_push['Title'] = json_data['name'];
					}
					
					if (typeof json_data['sku'] != 'undefined' && json_data['sku']) {
						to_be_push['SKU'] = json_data['sku'];
					}
					
					if (typeof json_data['offers'] != 'undefined' && json_data['offers']) {
						if (typeof json_data['offers'][0] != 'undefined' && json_data['offers'][0]) {
							if (typeof json_data['offers'][0]['price'] != 'undefined' && json_data['offers'][0]['price']) {
								to_be_push['Price'] = (json_data['offers'][0]['price']).toFixed(2);			
								to_be_push['Price'] = '$'+(to_be_push['Price']);	
							}
						}
					}
					



							
					for (var key in to_be_push) {
					    if (to_be_push.hasOwnProperty(key)) {
					        to_be_push[key] = ''+to_be_push[key];
					    }
					}
					final_data_temp.push(Object.assign({}, to_be_push));
					final_data = final_data.concat(final_data_temp);	
			}
			
			jQuery('#prod_log').text('Index: ' + window.srcindex + ' / ' +'Status: ' + window.final_data.length + ' / ' + input_data.length);				
			if(window.srcindex>input_data.length-1){console.log('ALL done')};
			if(window.srcindex>input_data.length-1){


		            setTimeout(function(){
						window.all_DONE=true;
					},35000);

			}
				window.current_request_stack--;	
	}).fail(function(xhr, textStatus, errorThrown){
            setTimeout(function(){
            	if (trycounter>4) {
            		window.current_request_stack--;
            	}
            	else{
            		trycounter++;
            		console.log('retry trycounter',trycounter)
            		window.call_api_data(input_key,trycounter)
            	}
			},2700);
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
				var	page_url=window.sub_cat_urls[window.category_pointer]+'?page='+pointer;

				jQuery.ajax({
			        type: "GET",
				    url: page_url,
				    crossDomain: true,				    
					tryCount : 0,
			    	retryLimit : 4,
				}).done(function(products_res,status,xhr){

					jQuery('#cat_log').text('Category Status: ' + (pointer) + ' / ' +(window.category_pointer+1) + ' / ' + window.sub_cat_urls.length);


					var products_html = jQuery(jQuery.parseHTML(products_res));
					var products_ary = products_html.find(window.element_has_url).parent().find('a.product-item__title');					

					products_ary.each(function(i,e){
						var product_link=this.href;
						if(window.input_data.indexOf(product_link) === -1)
							window.input_data.push(product_link);
					});

					pointer++;
					if(products_ary.length>0 && products_html.find('.pagination__next.link').length != 0){//&& pointer<totalpages+1  && pointer<=window.end_at
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
get_input_urls();	
// jQuery.ajax({
//         type: "POST",
// 	    url: 'https://regowholesale.com/account/login',
// 	    data:{"form_type": "customer_login","utf8": "✓","customer[email]": "Isaias@Nextchapterbooks.co","customer[password]": "3ncrypt3D!@#","return_url": "/account","recaptcha-v3-token": "03ANYolqsECGeQLWf5L3himEncEsLzAxj-ObGNXLNX3t7u1oMfv1lnDSlGkHMBGSoW_cI2EGlWV5iLN9e2BNDtByhUUs1r4x67C0GQVSRvyf8YPRuY5NKU-k3QlW7YHWaygBLt8gYCP-CJasjDKKGevG4ptnKoy49a_JoYn8tWQHzT39sRrJ2ilvyMQFYwnGbPS9d6NjoeT_CQIoRdv8zVPpKa-LE4EFT_rq3yi_iVUwi1DteWUXw0RUWwJZ8BW93Do6UcNMJ93hQ__f8rH4LT5kRwG-BetWydkA_FaAcesZk_kayBfy73KW94P5lDIklwJZAxYZWcfiiepUxAqNCaBk5c6xOWRkhQdF43P2REJhFd7Qk8Ya2wZvyCRWS1CJ4ZBfUSKyrNuv-_509jJwbwunt_04V4PetZCutx3bo0tMddo-GBEL7pi5c6ViTnVd8sKzLxAHPIJGJ2zAoMD41P8lgQa73XDYOekoBBRIc5A6wBJyt_6VDGMqkSY2EwNZPvE2ostywno19Tkis4OFJJmOMU6x2kqxFxoA"}
// 	}).done(function(products_res,status,xhr){
// 			get_input_urls();	
// 	});	
// /*END Scrape URL*/

// setInterval(function() {
// 	jQuery.ajax({
//         type: "POST",
// 	    url: 'https://regowholesale.com/account/login',
// 	    data:{"form_type": "customer_login","utf8": "✓","customer[email]": "Isaias@Nextchapterbooks.co","customer[password]": "3ncrypt3D!@#","return_url": "/account","recaptcha-v3-token": "03ANYolqsECGeQLWf5L3himEncEsLzAxj-ObGNXLNX3t7u1oMfv1lnDSlGkHMBGSoW_cI2EGlWV5iLN9e2BNDtByhUUs1r4x67C0GQVSRvyf8YPRuY5NKU-k3QlW7YHWaygBLt8gYCP-CJasjDKKGevG4ptnKoy49a_JoYn8tWQHzT39sRrJ2ilvyMQFYwnGbPS9d6NjoeT_CQIoRdv8zVPpKa-LE4EFT_rq3yi_iVUwi1DteWUXw0RUWwJZ8BW93Do6UcNMJ93hQ__f8rH4LT5kRwG-BetWydkA_FaAcesZk_kayBfy73KW94P5lDIklwJZAxYZWcfiiepUxAqNCaBk5c6xOWRkhQdF43P2REJhFd7Qk8Ya2wZvyCRWS1CJ4ZBfUSKyrNuv-_509jJwbwunt_04V4PetZCutx3bo0tMddo-GBEL7pi5c6ViTnVd8sKzLxAHPIJGJ2zAoMD41P8lgQa73XDYOekoBBRIc5A6wBJyt_6VDGMqkSY2EwNZPvE2ostywno19Tkis4OFJJmOMU6x2kqxFxoA"},
// 	    beforeSend: function(request) {
// 			//request.setRequestHeader("Authority", '');
// 		},
// 	})
// },45000)


/*OUR CODE ENDS*/
} },500);
