(function(window,undefined) {
	
	var files = [
		'in_type00_seed17.txt',
		'in_type00_seed18.txt',
		'in_type00_seed19.txt',
		'in_type01_seed17.txt',
		'in_type01_seed18.txt',
		'in_type01_seed19.txt',
		'in_type02_seed17.txt',
		'in_type02_seed18.txt',
		'in_type02_seed19.txt',
		'in_type03_seed17.txt',
		'in_type03_seed18.txt',
		'in_type03_seed19.txt',
		'in_type04_seed17.txt',
		'in_type04_seed18.txt',
		'in_type04_seed19.txt',
		'in_type05_seed17.txt',
		'in_type05_seed18.txt',
		'in_type05_seed19.txt',
		'in_type06_seed17.txt',
		'in_type06_seed18.txt',
		'in_type06_seed19.txt',
		'in_type07_seed17.txt',
		'in_type07_seed18.txt',
		'in_type07_seed19.txt',
		'in_type08_seed17.txt',
		'in_type08_seed18.txt',
		'in_type08_seed19.txt',
		'in_type09_seed17.txt',
		'in_type09_seed18.txt',
		'in_type09_seed19.txt',
		'in_type10_seed17.txt',
		'in_type10_seed18.txt',
		'in_type10_seed19.txt',
		'in_type11_seed17.txt',
		'in_type11_seed18.txt',
		'in_type11_seed19.txt',
		'in_type12_seed17.txt',
		'in_type12_seed18.txt',
		'in_type12_seed19.txt',
		'in_type13_seed17.txt',
		'in_type13_seed18.txt',
		'in_type13_seed19.txt',
		'in_type14_seed17.txt',
		'in_type14_seed18.txt',
		'in_type14_seed19.txt',
		'in_type15_seed17.txt',
		'in_type15_seed18.txt',
		'in_type15_seed19.txt',
		'in_type16_seed17.txt',
		'in_type16_seed18.txt',
		'in_type16_seed19.txt',
		'in_type17_seed17.txt',
		'in_type17_seed18.txt',
		'in_type17_seed19.txt',
		'in_type18_seed17.txt',
		'in_type18_seed18.txt',
		'in_type18_seed19.txt',
		'in_type19_seed17.txt',
		'in_type19_seed18.txt',
		'in_type19_seed19.txt',
		'in_type20_seed17.txt',
		'in_type20_seed18.txt',
		'in_type20_seed19.txt',
		'in_type21_seed17.txt',
		'in_type21_seed18.txt',
		'in_type21_seed19.txt',
		'in_type22_seed17.txt',
		'in_type22_seed18.txt',
		'in_type22_seed19.txt',
		'in_type23_seed17.txt',
		'in_type23_seed18.txt',
		'in_type23_seed19.txt',
		'in_type24_seed17.txt',
		'in_type24_seed18.txt',
		'in_type24_seed19.txt',
		'in_type25_seed17.txt',
		'in_type25_seed18.txt',
		'in_type25_seed19.txt',
		'in_type26_seed17.txt',
		'in_type26_seed18.txt',
		'in_type26_seed19.txt'
	];
	
	var $dropdown;
	
	function draw(filename) {
	
		$.get('data/' + filename, function (data) {
				alert(data);
		});
	
		$.jqplot('chartdiv',  [[[1,1]]], {
			axes: {
				yaxis: {
					min: 0,
					max: 100
				},
				xaxis: {
					min: 0,
					max: 100
				}
			}
		});		
	}
	
	function fillDropdown() {
		$.each(files, function(index, value) {
			$dropdown.append($('<option/>').val(value).text(value));
		});
	}
	
	$(function() {
		$dropdown = $('#file-select');
			
		fillDropdown();
		
		draw($dropdown.val());
		
		$dropdown.change(function () {
			draw($dropdown.val());
		});		
	});
	
})(window);