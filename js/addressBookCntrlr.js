
'use strict';

//Router

addressBook.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when ('/listOfContacts', {
                templateUrl: 'template/listOfContacts.html',
                controller: 'listOfContacts'
            }
        );
    }
]);


//Controller

addressBook.controller('listOfContacts',
    function ($scope, ngDialog) {

        window.z = $scope;

        var contactsArray = localStorage.getItem('contacts');
        $scope.contacts = JSON.parse(contactsArray);

        if ($scope.contacts === null) {
            $scope.contacts = [];
        }

        var buttonsForDeleteAllContacts = function () {

            var checkAll = $('[name=checkAll]');
            var deleteContacts = $('[name=deleteContacts]');

            if ($scope.contacts.length > 1) {
                checkAll.addClass('checkAll');
                deleteContacts.addClass('deleteContacts');
            }
            if ($scope.contacts.length <= 1) {
                checkAll.removeClass('checkAll checkedAll');
                deleteContacts.removeClass('deleteContacts');
            }
        };
        buttonsForDeleteAllContacts();



        $scope.openDialog = function () {
            ngDialog.open({
                template: ' template/addNewContact.html',
                scope: $scope
            });
        };



        $scope.createContact = function () {

            $scope.contact = {
                contactName: '1',
                contactEmail: '1',
                contactBirthday: '1',
                contactPhoneNumber: '1'
            };
            $scope.openDialog();
            $scope.flag = -1;
        };


        $scope.editContact = function (eventClick) {

            var contacts = $scope.contacts;
            var contactIndex = $(eventClick.target).parent().parent().index();
            $scope.indexOfContact = contactIndex - 1;
            $scope.contact = {
                contactName: contacts[$scope.indexOfContact].contactName,
                contactEmail: contacts[$scope.indexOfContact].contactEmail,
                contactBirthday: contacts[$scope.indexOfContact].contactBirthday,
                contactPhoneNumber: contacts[$scope.indexOfContact].contactPhoneNumber
            };
            $scope.openDialog();
            $scope.flag = 1;
        };



        $scope.num = 0;
        $scope.save = function () {

            var contact = {
                contactName: $('[name=contactName]').val(),
                contactEmail: $('[name=contactEmail]').val(),
                contactBirthday: $('[name=contactBirthday]').val(),
                contactPhoneNumber: $('[name=contactPhoneNumber]').val()
            };

            var contacts = localStorage.getItem('contacts');

            if (contacts === null) {
                localStorage.setItem('contacts', JSON.stringify([]));
            }

            var contactsStr = localStorage.getItem('contacts');
            var contactsArray = JSON.parse(contactsStr);

            if ($scope.flag === -1) {
                contactsArray.push(contact);
                $scope.contacts = contactsArray;
            } else {
                $scope.contacts[$scope.indexOfContact] = contact;
                contactsArray[$scope.indexOfContact] = contact;
            }

            localStorage.setItem('contacts', JSON.stringify(contactsArray));

            $scope.flag = 0;

            ngDialog.close();

            buttonsForDeleteAllContacts();
        };



        $scope.selectAllContacts = function (eventClick) {

            var $eventClick = $(eventClick.target);
            var checkbox = $('[name=checkbox]');
            if ($eventClick.hasClass('checkAll')) {
                $eventClick.removeClass('checkAll');
                $eventClick.addClass('checkedAll');

                checkbox.removeClass('checkbox');
                checkbox.addClass('checkbox_checked');
            }else{
                $eventClick.removeClass('checkedAll');
                $eventClick.addClass('checkAll');

                checkbox.removeClass('checkbox_checked');
                checkbox.addClass('checkbox');
            }
        };



        $scope.deleteContact = function (eventClick) {

            var contactIndex = $(eventClick.target).parent().parent().index();
            var indexOfContact = contactIndex-1;
            var contactsStr = localStorage.getItem('contacts');
            var contactsArray = JSON.parse(contactsStr);
            contactsArray.splice(indexOfContact, 1);
            localStorage.setItem('contacts', JSON.stringify(contactsArray));
            $scope.contacts = contactsArray;

            buttonsForDeleteAllContacts();
        };


        $scope.indexesOfClickedContacts = [];

        $scope.clickCheckbox = function (eventClick) {
            var $eventClick = $(eventClick.target);
            if ($eventClick.hasClass('checkbox')) {
                $eventClick.removeClass('checkbox');
                $eventClick.addClass('checkbox_checked');
            } else {
                $eventClick.removeClass('checkbox_checked');
                $eventClick.addClass('checkbox');
                }
            var contactIndex = $(eventClick.target).parent().parent().index();
            var indexOfContact = contactIndex - 1;
            $scope.indexesOfClickedContacts.push(indexOfContact);
        };


        $scope.deleteAllContacts = function () {
            var contacts = $scope.contacts;

            $scope.remainingСontacts = [];
            var remainingСontacts = $scope.remainingСontacts;

            for (var i = 0; i < contacts.length; i++) {
                if ($scope.indexesOfClickedContacts.indexOf(i) === -1) {
                    remainingСontacts.push(contacts[i]);
                }
            }
            if ($('[name=checkbox]').hasClass('checkbox_checked')) {
                if (remainingСontacts.length === contacts.length) {
                    localStorage.setItem('contacts', JSON.stringify([]));
                    $scope.contacts = [];
                } else {
                    $scope.contacts = remainingСontacts;
                    localStorage.setItem('contacts', JSON.stringify(remainingСontacts));
                }
                $scope.indexesOfClickedContacts = [];
                buttonsForDeleteAllContacts();
            }
        };
    }
);













