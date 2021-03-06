'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    user() {
        return this
            .belongsTo('App/Models/User')
    }

    items() {
		return this
            .hasMany('App/Models/Item')
            .where('deleted_at', null)
	}
}

module.exports = Order
