
~~Title: instead of "Improving on Tool", you should mention the software engineering aspects. Redesign, or refactoring, or similar.~~

~~Abstract: re-ID is usually done via hardware tags, not photos. It is only when tags get lost that this becomes tedious. Also, tags do not catch new specimens. So it would be good to quickly mention this (Ignacy did so in his paper)/~~

~~You also did not specify which tool you are working on. Be more specific -- a matching tool was previously developed in the School and used in trials, but was difficult to use and deploy by experts. Your project is the re-working and reorganizing of this particular tool.~~

Introduction: this starts well, but could do with a few references. You mention various tools and should refer to them already here (even though this is coming later, in the context survey), and when you make statements that are general and outside your field (e.g., problems with tags), it is also good to add a reference.



Fig1: always cite the source of a figure, if taken from another source. Figures would ideally be at the top of the page (sometimes on the bottom), not in the middle of the page.

~~p5: no need to explain the meaning of primary and secondary objectives.~~ 

~~p7: "Database Assisted" -- this list needs an introduction, for example: "Computer vision-based methods can be divided into the following types: ..."~~

~~p7: "who published in the same journal" -- this is confusing and I don't think it's needed. Or at least name the journal.~~

~~p7: "you could search the database" -> "one could search the database", avoid addressing the reader directly as "you"~~

p11: try to avoid large empty blocks like this one.
p11: "The SIFT algorithm actually struggles a bit with this..." -- do you have a source for this statement? It seems quite vague

~~p13: "Original tool" is not a good title.~~
~~p13: "developed by Groth" -- use full name, or if more than one author, "Groth et al."~~

~~p17: The line spacing changes half-way through this page, starting with "There are several..."~~

The context survey is good, but you should start it with a brief summary of what the chapter is about, and end with a brief recap of the most important information you have presented and how this influenced your design

Your implementation chapter needs more details. For example Sec 3.1 looks like no serious work was done. If you did something, you need to clearly explain it: what issues did you find by using pylint, how many changes did you make, what changes were they? I assume that you have a list. Which files were changed, how many lines of code, etc.

You may want to split this chapter into two or more chapters, centred around the main tasks. There could be a chapter on cleaning, setting up and code analysis; one on refactoring (including the new library); and one on packaging and documentation. The main text describing your contribution is 8 pages, and I am convinced that you can add a lot of detail that would make your work stand out more.

You also need to relate what you did to good SE principles. Why are you doing this? How does it relate to good practice? Do you have any evidence that the tool was better (and how) after your changes than before you started?

Fig 10: is this the result of your understanding? I don't think that Ignacy provided a UML diagram of his work. If you did this, then you need to clearly state this and explain the process. Documenting the existing code is a significant piece of work which enabled you to make more significant and meaningful changes. Never downplay your own work, instead explain it and demonstrate why it was necessary and useful. The dissertation is your chance to demonstrate that you know what to do, why to do it, and can evaluate the impact of the choices you have made -- doing the right things for the right reasons and being able to demonstrate its usefulness. At the moment, the dissertation does not always manage to show this.

Sec 3.2: when discussing individual steps of the algorithm (fish masks and spot masks), you should refer to the pages in the context survey where this process is explained. This way the reader can easily get the details if they need to.

Figs 11 and 12 would benefit from showing the original photo of the fish

This whole section may better be split into subsections and centre around individual classes or modules. The current explanation does not perfectly map onto the UML diagram and can be harder to understand as a result.

p21: "a few minor bugs..." -- which minor bugs? List them, and explain your solution briefly as part of the cleaning up/fixing up process. If you don't consider these contributions meaningful, the markers won't either

Sec 3.3 "Converting to Library" -- you only have one paragraph here. I would expect at least a page: why do this? how did you do this and why? what is the design of the library and why? You could refer to the explanation of the tool usage process from earlier and argue that there should be a simpler way to use the library, then explain how that affected the design of your library. Why bother with the library at all? You could discuss the Jupyter dependency, the unclear and undocumented process, etc. All of this is left unstated. You simply say that you converted the code to work as a library. The why and how are very important here!

A before-after comparison of the process would be useful here. Maybe a couple of screenshots of the library in use (before-after, in a Jupyter notebook).

I am not sure that page 22 is the right place to discuss the matching problems. I think that you are describing this in chronological order -- how you discovered these issues and when you addressed them, but the matching problem is quite separate from the library packaging and refactoring. Even if it was the refactoring that led you to find and fix the problem. I would focus on the bugs together with other bug fixes and cleaning-up work (separate chapter preceding this one), and focus on the software engineering aspects in this chapter (library design, API design, class hierarchy design, etc.) This focuses each chapter on a related set of issues, making it easier for the reader because they do not need the entire picture at all times. You can always cross-reference here and say that this bug was discovered during the refactoring process (which will be described in Sec x.x...) or similar.

~~p22: "you can simply create..." --> "one can simply create" or "a virtual environment can be created..."~~
~~p22 "provided to you" -- ditto: "provided" is enough~~

p24: "isn't good coding practice to use dictionaries for this purpose" -- one could argue that this is not the fault of dictionaries as such, but the way the keys encode information in strings. So it's good to explain this point (and how the original approach works) in detail, explain why it was done this way (original work focused on matching algorithm, with organization of data an afterthought), and why an object-oriented approach would be a better fit.

p24: "The first step was to create a Fish class" -- you are again telling a story in chronological order here. I would argue that the first step would be to zoom out and decide on a new organization of code based on OOP principles. You can then show the UML diagram and describe individual components, i.e., a top-down approach. Then explain what the Fish class does (and others).

~~p24: "Figure 14 shows a simplified UML diagram..." -- why simplified? Why not show the full UML diagram if documentation and refactoring are main contributions? If you mean that only minor methods like getters and setters are missing, then it's OK to state this in the caption without making the diagram sound incomplete in the main text.~~

p25: "there was another issue which could be addressed" -- once again, you are describing this like a quest in Zelda :) One mission after another. What you want instead is to describe your contributions in the most organised way possible. The work described here addresses the way directory structure was hard-coded. It is good to mention this as a specific problem (subsection devoted to it) and describe how your new approach (shown in the UML diagram) changes this and improves it.

Documentation also needs far more detail -- what technology, what was documented (classes, members, methods, etc.), give examples for each, give example of auto-generated HTML documentation (with further examples in the appendices), give an overview of how much new text you have added to the documentation, etc. At least a couple of pages are needed to do justice to the work you actually did.

So I would re-organise Ch3 this along the following lines:

3 Cleaning and understanding the code
3.1 Setting up existing code
3.2 Analysis of existing code (including documentation, UML)
3.3 Problems with the code, both structural and how the code has to be used
3.4 Clean-up and bug fixes

4 Refactoring
4.1 Summary of problems (dictionary keys, undocumented data types, Jupyter troubles...)
4.2 New code structure (UML)
4.2.1 Fish class
4.2.2 Matcher class
4.2.3 Updated DB_Util class (for example)
4.2.4 UNetMaskExtractor class etc.
4.3 Library organisation

5 Packaging and documentation
5.1 New workflow
5.2 Technical details (technologies used, etc.)
5.3 Documentation

6 Evaluation and critical appraisal


The evaluation currently only compares to the original objectives. What you want here is to evaluate how well your system works and how good your work is. Here you want to discuss how many bugs you have fixed, how easy the library is to use and install, how much documentation is available. Have you actually tested the installation on Linux/Mac/Windows? You should have! If you did, why not write a brief summary of the process (with screenshots) and how well it worked? Why not write a bit about your meeting with Michael and Lizy and their positive comments, as well as how these comments affected your later work (you only say little about this). What is the improvement in terms of pylint reports before/after? Give measurable evaluation of what you have done that would convince a critical reader that your work was good.



This diagram does not cover every single function in the code but includes all of the more significant functions. It is clear from this that the Matcher class is the primary component of the code. The matcher is used by creating a Matcher object, then calling the matching function with the query image and images to match against each passed in. The matching function will then use one of two matching algorithms depending on which one is selected—the Groth matcher, or Astroalign. Both of these matchers perform the matching based on the spot patterns on the fish. To do this accurately they perform the matching on versions of the images that have a mask applied to isolate the spots. A few steps must be taken to generate these “spot images”. First, another “mask image” must be created by the UnetMaskExtractor which isolates the fish in the original image. This mask image is used to crop the original image so anything on the edge of the image doesn’t interfere with the spot isolation. Finally, the UnetSpotExtractor is used on the cropped image to create the spot image.  An example of a mask image and spot image for the same fish is shown in figures 11 and 12.

```python
images = {"image key": {
	"img":        "path/to/file",
	"mask":       "path/to/file",
	"maskLabel":  "path/to/file",
	"spotsLabel": "path/to/file",
	"spots":      "path/to/file",
	"spotsJson":  "path/to/file",
	"precomp":    "path/to/file",
	"precompAA":  "path/to/file",
}}
```

