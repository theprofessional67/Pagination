(function ( $ ) {
	$.fn.pagination = function(options){
		var settings = $.extend({}, $.fn.pagination.defaults, options);
		var itemsPerPage = settings.itemsPerPage = parseInt((settings.itemsPerPage && !isNaN(settings.itemsPerPage)) ? settings.itemsPerPage : 5);	
		if(this.length > 0){
			var This = this;
			var totalItem = parseInt(This.length);
			var pagers = Math.ceil(totalItem / itemsPerPage);
			This.each(function(index,value){
				$(this).attr('data-index',index+1);	
			});
			This.hide();
			var html = '';
			html += '<div class="pagination">';
			html += '<a href="javascript:void(0);" class="prev" style="display:none;">Prev</a>';
			for(var count = 1; count <= pagers; count++){
				var activeClass = (count == 1) ? "active" : '';
				var dataVal = count - 1; 
				html += '<a href="javascript:void(0);" class="page '+activeClass+'" data-val="'+dataVal+'">'+count+'</a>';
			}
			html += '<a href="javascript:void(0);" class="next">Next</a>';	
			html += '</div>';
			This.last().after(html);
			pagerBase = settings.pagerBase;
			$.fn.pagination.startUp(This,pagerBase,settings);	
			$.fn.pagination.bindClicks(This,pagers,settings);
		}
	};
	//default settings
	$.fn.pagination.defaults = {
		itemsPerPage :  5,
		pagerBase : 0
	};
	$.fn.pagination.startUp = function(This,pagers,settings){	
		var initialPoint = parseInt((pagers * settings.itemsPerPage) + 1);
		var finalPoint = (initialPoint + settings.itemsPerPage) - 1;
		This.hide();
		This.each(function(){
			var dataIndex = $(this).data('index');
			if(dataIndex >= initialPoint && dataIndex <= finalPoint){
				$(this).show();
			}
		});
	}
	$.fn.pagination.bindClicks =  function(This,pagers,settings){
		$('.page').on('click',function(){
			$('.page').removeClass('active');
			$(this).addClass('active');
			var dataVal = $(this).data('val');
			if(dataVal == 0){
				$('.prev').hide();	
				$('.next').show();		
			}else if(dataVal == (pagers-1)){
				$('.prev').show();
				$('.next').hide();
			}else{
				$('.prev').show();
				$('.next').show();
			}
			$.fn.pagination.startUp(This,dataVal,settings);
		});
		$('.prev').on('click',function(){
			$('.page.active').prev().trigger('click');
		});
		$('.next').on('click',function(){
			$('.page.active').next().trigger('click');
		});
	}
}( jQuery ));
