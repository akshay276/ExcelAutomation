var app = angular.module('app', [ 'ngTouch', 'ui.grid', 'ui.grid.edit',
		'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.exporter' ]);

app.controller('MainCtrl', [ '$scope','uiGridConstants','uiGridExporterService', 'uiGridExporterConstants', function($scope, uiGridConstants, uiGridExporterService, uiGridExporterConstants) {

	 $scope.addData = function() {
		   
			$scope.gridOptions.data.push({
		                "firstName": "New ",
		                "lastName": "Person ",
		                "company": "abc",
		                "employed": true,
		                "gender": "male"
		              });
		  };
	
		  $scope.reset = function () {
			    data1 = angular.copy(origdata);
			    columnDefs1= angular.copy(origColDef);
			    $scope.gridOptions.data = data1;
			    $scope.gridOptions.columnDefs = columnDefs1;
			  }
		  
	$scope.deleteSelected = function(){
		console.log("Inside Del Function");
		  angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
		    $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
		  });
		};
	
	 $scope.selectAll = function() {
	      $scope.gridApi.selection.selectAllRows();
	    };

	    $scope.clearAll = function() {
	      $scope.gridApi.selection.clearSelectedRows();
	    };
	
	$scope.gridOptions = {};
	//$scope.gridOptions.enableCellEditOnFocus = true;
	 $scope.gridOptions = {
			    enableFiltering: true,
			    enableCellEditOnFocus: true,
			    onRegisterApi: function(gridApi){
			      $scope.gridApi = gridApi;
			    }};

	$scope.gridOptions.columnDefs = [ {
		name : 'firstName',
		enableCellEdit : true
	}, {
		name : 'lastName',
		enableCellEditOnFocus : false,
		displayName : 'LastName',
		width : 200
	}, {
		name : 'company',
		enableCellEdit : true,
		width : 300
	}, {
		name : 'employed',
		displayName : 'Employed',
		enableCellEdit : false,
		width : 200,
		filter: {
	          term: '',
	          type: uiGridConstants.filter.SELECT,
	          selectOptions: [ { value: 'true', label: 'true' }, { value: 'false', label: 'false' }]
	        }
	} ];

	data = [ {
		"firstName" : "Cox",
		"lastName" : "Carney",
		"company" : "Enormo",
		"employed" : "true"
	}, {
		"firstName" : "Lorraine",
		"lastName" : "Wise",
		"company" : "Comveyer",
		"employed" : "false"
	}, {
		"firstName" : "Nancy",
		"lastName" : "Waters",
		"company" : "Fuelton",
		"employed" : "false"
	} ];

	$scope.gridOptions.data = data;
	var origdata = angular.copy(data);
	var origColDef = angular.copy($scope.gridOptions.columnDefs);
	//console.log("data:::  ",data);
	
	$scope.toggleFiltering = function(){
	    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
	    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
	  };
	
	$scope.exportCsv = function() {
	    var grid = $scope.gridApi.grid;
	    console.log("grid object: :" , $scope.gridApi.grid);
	    var rowTypes = uiGridExporterConstants.ALL;
	    var colTypes = uiGridExporterConstants.ALL;
	    uiGridExporterService.csvExport(grid, rowTypes, colTypes);
	  };
	  
} ]);