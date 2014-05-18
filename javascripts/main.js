(function(window,undefined) {
	
	var files = [
		'in_type01_seed17.txt',
		'in_type01_seed18.txt',
		'in_type01_seed19.txt',
		'in_type02_seed17.txt',
		'in_type02_seed18.txt',
		'in_type02_seed19.txt',
		'in_type00_seed17.txt',
		'in_type00_seed18.txt',
		'in_type00_seed19.txt',
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
	
	var COLOR_DEPOT = '#bb2232';
	var COLOR_VERTEX = '#3355cc';
	var COLOR_INITIAL_EDGE = '#557766';
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}	
	
	var plot;
	var plotData;
	var plotOptions;
	var routes;
	
	function refreshCanvas() {
		$newCanvas = $('<div style="height:700px;width:850px; margin-left:-100px"/>');
		$newCanvas.insertAfter($('#chartdiv'));
		$('#chartdiv').remove();
		$newCanvas.attr('id', 'chartdiv');	
	}
	
	function draw(filename) {
	
		var chartData = [];
		var seriesOptions = [];
		
		refreshCanvas();
		
		$.get('./data/' + filename, function (data) {
			//parsing the input
			var lines = data.split('\n');
			
			var tooltips = [];
			var customers = [];
			routes = [];
			
			for (var i=8; i<lines.length-1; ++i) {
				var line = lines[i].split(' ');
				chartData.push([[line[1],line[2], 'hello']]);
				seriesOptions.push({
					color: line[0] == 0 ? COLOR_DEPOT : COLOR_VERTEX
				});
				tooltips[seriesOptions.length-1] = 'demand='+line[3]+',time window=('+line[4]+','+line[5]+')';
				customers[parseInt(line[0])] = { _x: line[1], _y: line[2] };
			}
			
			plotData = chartData;

			$.get('./data/' + filename + '.ans', function (data) {
				var lines = data.split('\n');
				
				var initialRoutes = parseInt(lines[1]);
				
				$('#routes-initial li').remove();
				
				for (var i=0; i<initialRoutes; ++i) {
					var line = lines[2+i].split(' ');
					var chartLine = [];
					$('<li/>').html('<a href="#">vehicle ' + line[0] + '</a>').data('route-id',i).appendTo($('#routes-initial'));
					
					for (var j=1; j<line.length; ++j) {
						chartLine.push([customers[parseInt(line[j])]._x,customers[parseInt(line[j])]._y]);
					}
					routes.push(chartLine);
				}
				
				var optimalRoutes = parseInt(lines[3+initialRoutes]);
				
				$('#routes-optimal li').remove();
				
				for (var i=0; i<optimalRoutes; ++i) {
					var line = lines[4+initialRoutes+i].split(' ');
					var chartLine = [];
					$('<li/>').html('<a href="#">vehicle ' + line[0] + '</a>').data('route-id',initialRoutes+i).appendTo($('#routes-optimal'));
					
					for (var j=1; j<line.length; ++j) {
						chartLine.push([customers[parseInt(line[j])]._x,customers[parseInt(line[j])]._y]);
					}
					routes.push(chartLine);
				}				
				
				//get target function values for both
				function getTargetValue(text) {
					var t = text.split(' ');
					return parseFloat(t[t.length-1]);
				}				
				$('#stats-initial').text('F = ' + getTargetValue(lines[5+initialRoutes+optimalRoutes]));
				$('#stats-optimal').text('F = ' + getTargetValue(lines[10+initialRoutes+optimalRoutes]));
				
				plotOptions = {
					axes: {
						yaxis: {
							min: -10,
							max: 110
						},
						xaxis: {
							min: -10,
							max: 110
						}
					},
					series: seriesOptions,
					highlighter: {
						show: true,
						sizeAdjust: 7.5,
						tooltipContentEditor: function(str, seriesIndex, pointIndex, plot){
							return tooltips[seriesIndex];
						}				
					},
					cursor: {
						show: false
					}
				};
				
				plot = $.jqplot('chartdiv',  chartData, plotOptions);	
				
			});
			
	
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
		
		$('ul').on('click', 'li', function (event) {
			var route = routes[$(this).data('route-id')];

			var newSeriesData = plotData.slice(); //clone
			var newOptions = $.extend(true,{},plotOptions);;
			
			var newLine = [];
			for (var i=0; i<route.length; ++i) {
				newLine.push(route[i]);				
			}
			newSeriesData.push(newLine);
			newOptions.series.push({
				color: '#333333',
				showMarker: false,
				lineWidth: 1
			});
			
			plot.destroy();
			refreshCanvas();
			
			plot = $.jqplot('chartdiv', newSeriesData, newOptions);

			event.preventDefault();
		});
		
		draw($dropdown.val());
		
		$dropdown.change(function () {
			draw($dropdown.val());
		});		
	});
	
})(window);