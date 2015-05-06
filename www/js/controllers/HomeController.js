angular.module('app')

.controller('HomeController', function ($scope, $ionicPopup, $ionicModal, $state) {

	$scope.notes = [];
	$scope.newNote = {};
	$scope.id = -1;

	// set up ionic modal
	$ionicModal.fromTemplateUrl('templates/notes/newNote.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.showAddMenu = function () {
		$scope.popup = $ionicPopup.show({
			scope: $scope,
			title: 'New Note',
			templateUrl: 'templates/newNotePopup.html'
		})
	}

	$scope.newTextNote = function () {
		// popup a modal form for note
		$scope.popup.close();
		$scope.modal.show();
	}

	$scope.closeNewTextNote = function () {
		// $state.go('tab.home');
		$scope.modal.hide();

		if (!$scope.edit) {
			// add new note
			$scope.id = $scope.id + 1;
			$scope.notes.push({
				id: $scope.id,
				title: $scope.newNote.title || 'Untitled',
				content: $scope.newNote.content,
				timestamp: new Date()
			});
		}
		else {
			$scope.newNote.timestamp = new Date();
		}

		$scope.edit = false;
		$scope.newNote = {}
	}

	$scope.editNote = function (noteId) {
		var note = $scope.notes.filter(function (note) {
			if (note.id === noteId) { return true; }
		});

		$scope.newNote = $scope.notes[note[0].id];
		$scope.edit = true;
		$scope.modal.show();
	}

	$scope.newPhotoNote = function () {

	}
})