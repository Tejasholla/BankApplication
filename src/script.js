var app = angular.module("bankSearch", []);
app.controller("myTable", function($scope, $http) {
	$http.get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
	.then(function(response) {
		$scope.bankDetails = response.data;
	}, function (error) {
			alert('failed');
		});
	});
	
	
	var table = '#banktable'
	$('#maxRows').on('change', function(){
	$('.pagination').html('')
	var trnum = 0
	var maxRows = parseInt($(this).val())
	var totalRows = $(table+' tbody tr').length
	$(table+' tr:gt(0)').each(function(){
		trnum++
		if(trnum > maxRows){
			$(this).hide()
		}
		if(trnum <= maxRows){
			$(this).show()
		}
	})
	var limit = 10
	if(totalRows > maxRows){
		var pagenum = Math.ceil(totalRows/maxRows)
		pagenum = limit;
		for(var i=1;i<=pagenum;){
			$('.pagination').append('<li data-page="'+ i +'">\<span>'+ i++ +'<span class="sr-only">(current)</span></span>\</li>').show()
		}
	}
	$('.pagination li:first-child').addClass('active')
	$('.pagination li').on('click',function(){
		var pageNum = $(this).attr('data-page')
		var trIndex = 0;
		$('.pagination li').removeClass('active')
		$(this).addClass('active')
		$(table+' tr:gt(0)').each(function(){
			trIndex++
			if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
				$(this).hide()
			}
			else{
				$(this).show()
			}
		})
	})
})
