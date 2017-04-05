var app = angular.module('app', [ 'ngTouch', 'ui.grid', 'ui.grid.edit',
		'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection',
		'ui.grid.exporter' ]);

app.controller('MainCtrl', [
		'$scope',
		'uiGridConstants',
		'uiGridExporterService',
		'uiGridExporterConstants',
		function($scope, uiGridConstants, uiGridExporterService,
				uiGridExporterConstants) {

			$scope.gridOptions = {};
			$scope.gridOptions1 = {};
			// $scope.gridOptions.enableCellEditOnFocus = true;
			
			gridOptions = {
				enableFiltering : true,
				enableCellEditOnFocus : true,
				onRegisterApi : function(gridApi) {
					$scope.gridApi = gridApi;
					$scope.gridApi1 = gridApi;
				}
			};

			columnDefs = [ {
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
				filter : {
					term : '',
					type : uiGridConstants.filter.SELECT,
					selectOptions : [ {
						value : 'true',
						label : 'true'
					}, {
						value : 'false',
						label : 'false'
					} ]
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

			
			$scope.gridOptions = gridOptions;
			$scope.gridOptions.data = data;
			$scope.gridOptions.columnDefs= columnDefs;
			
			$scope.gridOptions1 = gridOptions;
			$scope.gridOptions1.data = data;
			$scope.gridOptions1.columnDefs= columnDefs;
			
			

			/*$scope.exportCsv = function() {
				var grid = $scope.gridApi.grid + $scope.gridApi1.grid;
				console.log("grid object: :", grid);
				var rowTypes = uiGridExporterConstants.SELECTED;
				var colTypes = uiGridExporterConstants.ALL;
				uiGridExporterService.csvExport(grid, rowTypes, colTypes);
			};*/
			
			 $scope.csvExport = function  ($scope.gridApi.grid, "selected", "all") {
		          var self = this;
		          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function() {
		            var exportColumnHeaders = grid.options.showHeader ? self.getColumnHeaders(grid, colTypes) : [];
		            var exportData = self.getData(grid, rowTypes, colTypes);
		            var csvContent = self.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator);

		            self.downloadFile (grid.options.exporterCsvFilename, csvContent, grid.options.exporterCsvColumnSeparator, grid.options.exporterOlderExcelCompatibility, grid.options.exporterIsExcelCompatible);
		          })};
			/*$scope.exportCsv1 = function() {

				var grid = $scope.gridApi1.grid;
				console.log("grid1 object: :", $scope.gridApi1.grid);
				var rowTypes = uiGridExporterC	onstants.SELECTED;
				var colTypes = uiGridExporterConstants.ALL;
				uiGridExporterService.csvExport(grid, rowTypes, colTypes);
			};
			
			$scope.exportFinalCsv = function() {
				var grid = $scope.gridApi.grid;
				console.log("grid object: :", $scope.gridApi.grid);
				var rowTypes = uiGridExporterConstants.SELECTED;
				var colTypes = uiGridExporterConstants.ALL;
				uiGridExporterService.csvExport(grid, rowTypes, colTypes);
			};*/
			
			

		} ]);