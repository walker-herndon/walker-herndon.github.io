[[CS5042]]
### Introduction to Interaction Design
- Focus on the design process and not as much on the technical details and result
- Seems to only go as far as creating a creating a design plan, CS5041 does more prototyping, design, and implementation
- Pay more attention to the people using the system, not the system itself
### Academic Issues and Admin
- Almost no programming involved
	- kind of up to us how much we want to do, just need some form of a prototype but that could just be something in Figma
- Will be reading material for each week with a small quiz each week to ensure you've done the reading
	- You are allowed to do the quizzes as a group and split the reading between everyone
	- The quizzes are 16% of the overall grade (8 quizzes, 2% each)
- Will be assigned groups of roughly 4-5 students
- P1 due week 5 and is focused on conducting interviews for the project
	- this is kind of foundational work so important to do well
	
![[CS5042-Schedule.pdf.png]]
- Need a sketch book?
	- It is considered required material, wonder if I can just use my iPad for this instead?
### Project Presentations
#### Acoustic Visualization
- Use remote sensors to record and detect animals
- Can use that to track animal populations
- Very different from prior methods which means the whole pipeline for data collection and transformation needs to be redesigned
- Visualize this data in a spectrogram
- Have software to do initial processing from the spectrograms
- The hole in the pipeline is the next step
	- Can detect the location of the animal from the series of microphones picking up the noise and map that data
- Ideally would be done in R and ensure it is easily maintainable, intuitive, user-friendly, and adaptable (could maybe use Python)
	- That probably goes beyond what this module will be dealing with
	- would be great if this could be converted to work with other species outside of just Gibbons
- Gibbons may hoot a lot and multiple at once so it can be pretty challenging to handle this data
Top 3

#### French Digital Library
- Match between what someone is interested in and the resources that fit their interests
- Library of different online French resources for people to search and access
- Already have a rough prototype in a Heroku app
- Want this team to assess the needs and requirements of teachers and pupils to propose design suggestions and enhancements
- Can collaborate with the intern working on development
Seemed fine but just not particularly interesting to me

#### AI-Generated Species Detection
- Think of client as the manager of an ecological organization to measure biodiversity
- Past 2 decades using remote camera capture (now with computer vision) to detect animals and identify species
- Can't just blindly trust the machine to get it right, need human-in-the-loop process to verify some of this data and ensure good results are being generated
- Can use some public platform for verification

- Now we want to do the same thing but with audio instead of images and create the same verification platform for it
	- users who are experts on bird sounds can then listen to the audio clip and verify the classification is correct by identifying the bird themselves
- Same spectrogram process as with the Gibbons and do the same computer vision process to identify species
- At this point they have no idea how to do this, they know what they want but no clue how to get there which is where we come in
Probably #1 choice

#### Digital Research Highways
- Wikipedia based on volunteers, but number of volunteers is declining and they have biases
- Trying to improve on this problem to ensure public open-knowledge information is still readily available
- Want some interactive pipeline for people to basically onboard to becoming contributors to open-knowledge platforms
	- For example, there is an ethics process people need to go through before becoming contributors. This should be one of the steps in the pipeline
- Focus on wikipedia as a starting point, but not limited to this
Seemed a bit vague, not a super clear direction here, this is also the DEI one

#### Animals of the Polis
- Mapping animal regionality in the Greek world
- Want some sort of interactive platform for mapping and viewing animals in different regions and specifically the animals which had a cultural impact on Greeks as shown in various forms of Greek art including pottery, coins, mosaics, etc
- Data already exists in many different forms, like some for coins, some for pottery, etc
- Want to gather that all together in the many different forms and try to merge it into one place
- Can be difficult to merge these data sources together so that it can be presented in a usable way
Seemed fairly interesting, somewhere in the middle of my rankings

#### Young People's Health
- Presenter couldn't be here but there will be a video later with more detail
- Trying to create a platform for tracking children's health
- Probably won't be able to interview any children due to ethics constraints
- Want to build out an app for this and we would need to design an interface and compile all previous data from past years of work on this project to produce a final design for the app
Seems also not too bad, maybe below Animals of the Polis?

#### The Herbarium Project
- An attempt to deconstruct the St Andrews Herbarium to reconstruct a more accessible archive
- St Andrews Herbarium is not very well catalogued and needs a lot of refreshment
- Ideally want to digitize this data to improve accessibility
- Pretty open to ideas
- He seems pretty big on the story and connection of the plants and not as much on the design part that we would be doing so doesn't seem like he has a super clear direction or vision for what he wants
A bit on the lower side of the rankings but not the worst one

#### CEED Peer Support Project
- Peer learning platform currently structured in the form of 1-to-1 mentorship
- Want to allow for more group projects but software limitations get in the way of this and can be too many students to do this manually
- An example of this is for creating study groups, want some platform to allow people to group themselves by certain categories depending on their work, the environment they want to work in, the times available to them, etc
- Also want to pair a group of 3rd years with one 4th year mentor
- Currently trying to use excel and similar things to do these processes but that obviously sucks
Seems really cool, maybe #3?