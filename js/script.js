

$(function(){

	// $('html, body').animate({ scrollTop: 0 }, 100);
	// $(window).resize(function(){location.reload();});

	// input, textarea label animation

	$('.container-input > input, textarea').on('click',function(){
		$(this).prev().addClass('focus');
		$(this).next().addClass('focus');
	});
	$('.container-input > input[type=text]').on('blur', function(){
		let oNext;
		oNext = $(this).parent().next().find('.rect');
		if(oNext.length == 0){
			oNext = $(this).parent().parent().next().find('.container-input').find('.rect');
		}
		oNext.addClass('focus');

	});
	$('.container-input > input, textarea').on('blur', function(){
		if( !$(this).val())
		{
			$(this).prev().removeClass('focus');
			$(this).next().removeClass('focus');
		}else{
			$(this).prev().addClass('focus');
			$(this).next().addClass('focus');
		}
	});
	$('.container-input > input, textarea').each(function(i,el){
		if( $(this).val() != ''){
			$(this).prev().addClass('focus');
			$(this).next().addClass('focus');
		}
	});

	//menu mobile
	$('#closeMobMenu').on('click', function(){
		$('.menu-mobile').addClass('closed');
	});
	$('.menu-mobile a').on('click', function(){
		$('.menu-mobile').addClass('closed');
	});

	$('#openMobMenu').on('click', function(){
		$('.menu-mobile').removeClass('closed');
	});

	//home animation
	$('.home')
		.animateCss('fadeIn slow')
		.css('opacity','1');

	//Service animation
	$('.service .arrow-container').each(function(i,el){
		$(el).on('click', function(){
			if($(this).hasClass('hide') == false){
				$(this).addClass('hide');
				$(this).prev().slideToggle(300);
			}else{
				$(this).removeClass('hide');
				$(this).prev().slideToggle(300);
			}
			
		});
	});
	

	var map;
		
	

	$('#exampleModal').on('shown.bs.modal', function () {
	 	if(!map){

	 		var center = {lat:-36.847178, lng: 174.763786}; 
		 	map = L.map('map').setView(center, 12);

		 	L.tileLayer('https://api.mapbox.com/styles/v1/mary-trepakova/cjotjoufl1abd2rpj2st4259i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyeS10cmVwYWtvdmEiLCJhIjoiY2pra2V6cHRzMDEzbDNqczc5NjF0aWptbiJ9.f52j7_rFo6_WhBh3aD3QKw').addTo(map);
		 	var userIcon = L.icon({
		 		iconUrl: '../assets/icons/icon.png',
		 		iconSize: [60,75]
		 	});
		 	var userMarker = L.marker(center,{icon: userIcon}).addTo(map);
 			userMarker.bindPopup('<div class="user-popup">Kia ora</div>');
	 	}
	})

});


function checkExist(){
	var bValid = false;
	var sValue = this.value;
	if( sValue == ''){
		this.className = "form-control is-invalid"
	}
	else{
		this.className = "form-control is-valid"
		bValid = true;
	}
	return bValid;
}

function checkAlphabetic(){
	bValid = false;
	var sValue = this.value;
	if( sValue == ''){
		this.className = "form-control is-invalid"
	}
	else{
		var oAphabeticExp = /^\s*([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/;
		var bTest = oAphabeticExp.test(sValue);
		if( bTest == false){
			this.className = "form-control is-invalid"
		}
		else{
			this.className = "form-control is-valid"
			bValid = true;

		}
		return bValid;
	}

}

function checkEmail(){
	bValid = false;
	var sValue = this.value;
	if( sValue == ''){
		this.className = "form-control is-invalid"
	}
	else{
		var oEmailExp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
		var bTest = oEmailExp.test(sValue);
		if( bTest == false){
			this.className = "form-control is-invalid"
		}
		else{
			this.className = "form-control is-valid"
			bValid = true;
		}
		return bValid;
	}
}
function checkPhone(){
	bValid = false;
	var sValue = this.value;
	if( sValue == ''){
		this.className = "form-control is-invalid"
	}
	else{
		var oPhoneExp = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g;
		var bTest = oPhoneExp.test(sValue);
		if( bTest == false){
			this.className = "form-control is-invalid"
		}
		else{
			this.className = "form-control is-valid"
			bValid = true;
		}
		return bValid;
	}
}

function checkAll(e){

	var bTest1 = checkAlphabetic.call(oNameInput);
	var bTest2 = checkPhone.call(oPhoneInput);
	var bTest3 = checkEmail.call(oEmailInput);
	var bTest4 = checkExist.call(oMessageInput);

	var bTotal = bTest1 && bTest2 && bTest3 && bTest4;
	if( (bTotal == false) || (bTotal == undefined) ){
		e.preventDefault();
	}

}

var oNameInput = document.querySelector('#name');
oNameInput.addEventListener('blur',checkAlphabetic);

var oEmailInput = document.querySelector('#email');
oEmailInput.addEventListener('blur',checkEmail);

var oPhoneInput = document.querySelector('#pNumber');
oPhoneInput.addEventListener('blur',checkPhone);

var oMessageInput = document.querySelector('#message');
oMessageInput.addEventListener('blur',checkExist);

var oForm = document.querySelector('form');
oForm.addEventListener('submit',checkAll);