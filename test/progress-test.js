"use strict";
(function(){
	// Import
	var expect = require('chai').expect,
		joe = require('joe')

	// Test
	joe.describe('progress plugin', function(describe,it){
		var Chainy = require('chainy-core').subclass().addExtension('progress', require('../'))

		it("should fire successfully", function(next){
			var chain = Chainy.create()
				.action(function(value, next){
					setTimeout(function(){
						return next(null, 5)
					}, 1000)
				})
				.progress()
				.action(function(value, next){
					setTimeout(function(){
						return next(null, 10)
					}, 1000)
				})
				.action(function(value, next){
					setTimeout(function(){
						return next(null, 20)
					}, 1000)
				})
				.action(function(value, next){
					this.create()
						.action(function(value, next){
							setTimeout(function(){
								return next(null, 100)
							}, 1000)
						})
						.action(function(value, next){
							setTimeout(function(){
								return next(null, 200)
							}, 1000)
						})
						.done(next)
				})
				.done(function(err, result){
					if (err)  return next(err)
					return next()
				})
		})
	})
})()
