/**
 * attach services to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each service of, for example, the `config` constants object.
 **/
define(['./login_service',
		'./user_service',
		'./resource_service',
		'./role_service',
		 './dept_service',
		 './empl_service',
		 './client_service',
		 './bank_service',
        './market_service',
        './customer_service'
		], function () {});
