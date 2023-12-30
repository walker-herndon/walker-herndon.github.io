[[CS5199]]

- Abstract
- Declaration
- Introduction
	- Problem Definition
	- Objectives
		- Primary
		- Secondary
	- Achievements
	- Ethics
- Context Survey
	- Animal Re-ID Techniques
	- Existing Tools for Animal Re-ID
	- Past work for Arctic Charr Re-ID
		- Original Tool
		- UI Component
	- Software Distribution Methods

Design part format - don't think I'll use "design" and "implementation" sections, just break up all the components of the project
- Initial cleanup and improvements of the tool
	- talk about going through and improving comments and fixing lots of small issues to make it all smoother and more readable
- Transforming into library
	- isolated matching component and converted to python library with `setup.py`
- Improving usability and refactor
	- better and more options for `get_fish()`
	- add `Fish` class instead of using dicts for everything
	- don't require a strict file structure anymore because of this and don't use that key format anymore
- add documentation for everything and installation instructions
- installation script for easy installation