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
	.controller('parentCtr', ['$scope',
		function($scope) {
            $scope.$on("Child_1_NameChange",
                function (event, msg) {
                    $scope.parent=msg;
                    $scope.$broadcast("Child_1_NameChangeFromParrent", "Parent Msg:"+msg);
                });
		}
	])
	.controller('childCtr1', ['$scope',
		function($scope) {
            $scope.change = function (name) {
                $scope.$emit("Child_1_NameChange", name);
            };
		}
	])
	.controller('childCtr2', ['$scope',
		function($scope) {
            $scope.$on("Child_1_NameChangeFromParrent",
                function (event, msg) {
                    $scope.ctr1_2_Name = msg;
                });
		}
	])
	.controller('FormCtrl', ['$scope',
		function($scope) {
            $scope.master = {};
            $scope.update = function(user) {
                $scope.master = angular.copy(user);
            };
            $scope.reset = function() {
                $scope.user = angular.copy($scope.master);
            };
            $scope.reset();
		}
	])
	.controller('formCtrl2', ['$scope',
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
	.controller('directiveCtrl', ['$scope',
		function($scope) {
            $scope.customer = {
                name: 'Naomi',
                address: '1600 Amphitheatre'
            };
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