var app = angular.module('qApp', []);

app.controller('qController', ['$scope', '$http', 'quizService', function ($scope, $http, quizService) {

    $scope.user = {
        id : 1
    }

    console.log($scope.user.id);

    $scope.onSubmit = function () {

        $http.get('/users/' + $scope.user.id)
            .success(function (result) {
                // console.log(result);
                $scope.resultData = result;
                $scope.$watch('resultData', function () {
                    quizService.questions2 = result;
                })

                console.log(quizService.questions2);

            });
        // console.log($scope.resultData);
    };

    $scope.checkDb = function () {

    }

    // $scope.$watch('resultDa', function () {
    //     heroService.heroName = $scope.overWatchDetails.name;
    // });



}]);


app.directive('quiz', function($http, quizService) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: '../directives/multiplechoice.html',
        link: function(scope, elem, attrs) {

            scope.start = function() {

               var updatedId = $http.get('/user/check/' + quizService.questions2[0].id)
                    .success(function (result) {

                        console.log(result[0].qid);
                        //The result[0].qid should out of the get method

                        return result;


                    });

                console.log(updatedId.$$state.value);
                //I'm having trouble in getting the result out of the $http.get method.

                scope.id = 0;
                scope.quizOver = false;
                scope.inProgress = true;
                scope.getQuestion();
            };

            scope.reset = function() {
                scope.inProgress = false;
                scope.score = 0;
            }

            scope.getQuestion = function() {
                var q = quizService.getQuestion(scope.id);
                if(q) {
                    scope.question = q.question;
                    scope.options = q.options;
                    scope.answer = q.answer;
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true;
                }
            };

            scope.checkAnswer = function() {
                if(!$('input[name=answer]:checked').length) return;

                var ans = $('input[name=answer]:checked').val();

                if(ans == scope.options[scope.answer]) {
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    scope.correctAns = false;
                }

                scope.answerMode = false;
            };

            scope.nextQuestion = function() {
                scope.id++;
                scope.getQuestion();

                var userId =[ id = quizService.questions2[0].id,
                    qid = scope.id
                ];

                console.log(quizService.questions2[0].id);
                $http.post('/users/later', userId)
                    .success(function (result) {
                        console.log(result);
                    });
            };

            scope.reset();
        }
    }
});


app.service('quizService', function() {

    var self = this;

   this.questions2 =  [];

    this.updatedId = [];

    var questions = this.questions2;



        this.getQuestion = function(id) {
            if(id < this.questions2.length) {
                return this.questions2[id];
            } else {
                return false;
            }
        }

});

