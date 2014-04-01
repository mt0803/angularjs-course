'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('angularIntroCtrl', ['$scope',
		function($scope) {
            $scope.yourName = "123";
        }
	])
    .controller('bindCon1', ['$scope',
        function($scope) {
            $scope.qty = 1;
            $scope.cost = 2;
            $scope.inCurr = 'EUR';
            $scope.currencies = ['USD', 'EUR', 'CNY'];
            $scope.usdToForeignRates = {
                USD: 1,
                EUR: 0.74,
                CNY: 6.09
            };

            $scope.total = function total(outCurr) {
                return $scope.convertCurrency($scope.qty * $scope.cost, $scope.inCurr, outCurr);
            };
            $scope.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
                return amount * $scope.usdToForeignRates[outCurr] / $scope.usdToForeignRates[inCurr];
            };
            $scope.pay = function pay() {
                window.alert("Thanks!");
            };
        }
    ])
    .controller('bindCon2', ['$scope','currencyConverter',
        function($scope,currencyConverter) {
            $scope.qty = 1;
            $scope.cost = 2;
            $scope.inCurr = 'EUR';
            $scope.currencies = currencyConverter.currencies;

            $scope.total = function total(outCurr) {
                return currencyConverter.convert($scope.qty * $scope.cost, $scope.inCurr, outCurr);
            };
            $scope.pay = function pay() {
                window.alert("Thanks!");
            };
        }
    ])
	.controller('filterCtrl', ['$scope',
		function($scope) {
            console.log(123);
            $scope.friends =[{name:'John', phone:'555-1212', age:10},
                    {name:'Mary', phone:'555-9876', age:19},
                    {name:'Mike', phone:'555-4321', age:21},
                    {name:'Adam', phone:'555-5678', age:35},
                    {name:'Julie', phone:'555-8765', age:29}];
            $scope.predicate = '-age';
            $scope.text1="1. {{ expression | filter }}                           比如： {{'abc'|uppercase}}";
            $scope.text2="2. {{ expression | filter1 | filter2 | ... }}          比如： {{'abc'|uppercase|reverse}}";
            $scope.text3="3. {{ expression | filter:argument1:argument2:... }}   比如： {{1288323623006 | date:'MM/dd/yyyy @ h:mma'}}: 10/29/2010 @ 11:40AM"
		}
	])
	.controller('InvoiceCntl', ['$scope',
		function($scope) {
			$scope.qty = 1;
			$scope.cost = 19.95;
			console.log($scope.qty);
		}
	])
	.controller('ClockCntl', ['$scope',
		function($scope) {
			$scope.format = 'M/d/yy h:mm:ss a';
			$scope.modalShown = false;
			console.log('123');
			$scope.toggleModal = function() {
				$scope.modalShown = !$scope.modalShown;
			};
		}
	])
	.controller('ExpreCtrl', ['$scope',
		function($scope, $window) {
			Array.prototype.contains = function(obj) {
				var i = $scope.length;
				while (i--) {
					if ($scope[i] === obj) {
						return true;
					}
				}
				return false;
			};
			var exprs = $scope.exprs = [];
			$scope.expr = '3*10|currency';
			$scope.addExp = function(expr) {
				if (!exprs.contains(expr)) {
					exprs.push(expr);
				};
			};
			$scope.removeExp = function(index) {
				exprs.splice(index, 1);
			}
			$scope.name = 'World';

			$scope.greet = function() {
				//alert('Hello ' + $scope.name);
			}
		}
	])
	.controller('FormCntl', ['$scope',
		function($scope) {
			$scope.master = {};
			$scope.update = function(user) {
				$scope.master = angular.copy(user);
			};
			$scope.reset = function() {
				$scope.user = angular.copy($scope.master);
			};
			$scope.isUnchanged = function(user) {
				return angular.equals(user, $scope.master);
			};
			$scope.reset();
		}
	])
	.controller('ScopeCntl', ['$scope',
		function($scope) {
			$scope.count = 0;
			$scope.$on('MyEvent', function() {
				$scope.count++;
			});
		}
	])
	.controller('MainCtrl', ['$scope',
		function($scope) {
			$scope.timeOfDay = 'morning';
			$scope.name = 'Nikki';
		}
	])
	.controller('ChildCtrl', ['$scope',
		function($scope) {
			$scope.name = 'Mattie';
		}
	])
	.controller('BabyCtrl', ['$scope',
		function($scope) {
			$scope.timeOfDay = 'evening';
			$scope.name = 'Tom';
		}
	])
	.controller('CheckboxCtrl', ['$scope', '$filter',
		function($scope, $filter) {
			$scope.chkall = false;
			$scope.chkArr = [{
				id: 1,
				text: "足球",
				checked: false
			}, {
				id: 2,
				text: "蓝球",
				checked: false
			}, {
				id: 3,
				text: "乒乓球",
				checked: false
			}, {
				id: 4,
				text: "网球",
				checked: false
			}];
			$scope.chkAll = function(checked) {
				angular.forEach($scope.chkArr, function(value, key) {
					value.checked = checked;
				});
			};
			$scope.$watch('chkArr', function(nv, ov) {
				if (nv == ov) {
					return;
				}
				$scope.choseArr = [];
				angular.forEach(
					$filter('filter')(nv, {
						checked: true
					}), function(v) {
						$scope.choseArr.push(v.text);
					});
				$scope.chkall = $scope.choseArr.length == $scope.chkArr.length;
			}, true);
			//ajax请求省略
			$scope.select1 = [{
				id: 1,
				text: "不同的数据"
			}, {
				id: 2,
				text: "今天是周一"
			}];
			$scope.selChange = function(id) {
				//这里应该ajax请求返回一个list就是下面的$scope.select2
				$scope.select2 = [{
					id: 1,
					text: "不同数据1"
				}, {
					id: 2,
					text: "又周二"
				}];
			}
		}
	]);
// .controller('DialogDemoCtrl', ['$scope','$dialog',
// 	function ($scope,$dialog) {


//   $scope.opts = {
//     backdrop: true,
//     keyboard: true,
//     backdropClick: true,
//     templateUrl:  'partials/dialog.html', // OR: templateUrl: 'path/to/view.html',
//     controller: 'TestDialogController'
//   };

//   $scope.openDialog = function(){
//   	console.log(123);
//     var d = $dialog.dialog($scope.opts);
//     d.open().then(function(result){
//     	console.log(result);
//       if(result)
//       {
//       	console.log(result);
//         alert('dialog closed with result: ' + result);
//       }
//     });
//   };

//   $scope.openMessageBox = function(){
//     var title = 'This is a message box';
//     var msg = 'This is the content of the message box';
//     var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

//     $dialog.messageBox(title, msg, btns)
//       .open()
//       .then(function(result){
//         alert('dialog closed with result: ' + result);
//     });
//   };
// 	}
// ]);

// // the dialog is injected in the specified controller
// function TestDialogController($scope, dialog){
//   $scope.close = function(result){
//     dialog.close(result);
//   };
// }