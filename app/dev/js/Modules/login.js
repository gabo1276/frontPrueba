define(['jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/headerMember', 'hbs!Templates/initialApplicationPage',
    'hbs!Templates/headerAdministrator','hbs!Templates/headerAdministrative','hbs!Templates/headerReceptionist', 'hbs!Templates/headerNursing'],
    function($, headerApplication,headerMember, initialApplicationPage,
        headerAdministrator, headerAdministrative, headerReceptionist,headerNursing) {

        var Login = {

            verifyIsUserlogded: function() {
                var flagSession = sessionStorage.getItem('sessionActive');
                var userName = sessionStorage.getItem('userName');
                var userProfile = sessionStorage.getItem('userProfile');
                var adminUserIdentificator = sessionStorage.getItem('adminUserIdentificator');
                var pass = sessionStorage.getItem('pass');
                var info = sessionStorage.getItem('info');
                if (flagSession == 1) {

                    switch (userProfile){
                        case "1":
                            $('#header').html(headerMember({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "2":
                            $('#header').html(headerAdministrator({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "3":
                            $('#header').html(headerAdministrative({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "4":
                            $('#header').html(headerReceptionist({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "5":
                            $('#header').html(headerNursing({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                    }
                    return true;
                    
                } else {
                    sessionStorage.clear();
                    window.location.href = "/corporateWebSite/index.html";
                }
            }
        }
        return Login;
    });