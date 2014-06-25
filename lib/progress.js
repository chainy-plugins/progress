"use strict";
module.exports = function(){
	var progress = require('progressbar').create()
	var total = 0
	var ticks = 0

	var step = function(name){
		progress.step(name)
		progress.setTotal(total)
		progress.setTick(ticks)
	}

	var attachListeners = function(group){
		var totals = group.getItemTotals()
		ticks += totals.completed
		total += totals.total

		group
			// this is only currently on sub taskgroups
			// not sub chains, this needs to be addressed in the future
			.on('item.add', function(item){
				total += 1
				if ( item.type === 'taskgroup' ) {
					attachListeners(item)
				}
			})
			.on('item.running', function(item){
				step(item.getNames())
			})
			.on('item.done', function(item){
				ticks += 1
			})
	}

	step(this.runner.getNames())
	attachListeners(this.runner)

	this.runner
		.on('done', function(){
			progress.finish()
		})

	return this
}
module.exports.extensionType = 'utility'