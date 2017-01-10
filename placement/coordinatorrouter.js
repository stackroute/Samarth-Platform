let router = require('express').Router();
let async = require('async');

let coordinatorprocessor = require('./coordinatorneoprocessor.js');

router.get('/profession', function(req, res) 
{
	try 
	{
		coordinatorprocessor.getProfessions(function(professions) 
		{
			res.status(200).json(professions);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/role', function(req, res) 
{
	try 
	{
		coordinatorprocessor.getRole(function(role) 
		{
			res.status(200).json(role);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/language', function(req, res) 
{
	try 
	{
		coordinatorprocessor.getLanguage(function(language) 
		{
			res.status(200).json(language);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/location', function(req, res) 
{
	try 
	{
		coordinatorprocessor.getLocation(function(location) 
		{
			res.status(200).json(location);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});
module.exports = router;