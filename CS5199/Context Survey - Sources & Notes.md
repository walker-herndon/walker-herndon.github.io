[[CS5199]]

- https://besjournals.onlinelibrary.wiley.com/doi/epdf/10.1111/2041-210X.13133
	- Past, present and future approaches using computer vision for animal re-identification from camera trap data
	- gives outline of history of computer vision models for animal re-identification specifically from camera trap data but lots of info relevant to other methods
	- good building block for context survey, gives nice foundational info
	- Lots of history behind animal re-ID
		- Started with database assisted re-ID which involved putting features into DB and searching based on these
			- Still a lot of manual work and not very flexible
		- Moved to feature engineering around 1998
			- this process involves automatically identifying and quantifying certain features in images and finding similar images based on these features
			- Used often from 1998-2013
		- Beginnings of ML in 2014
			- largely in the form of convolutional neural networks (CNN)
			- First use of a Siamese network for animal re-ID was in 2018
				- Doesn't need to be retrained when images are added which is much nicer for a lot of animal re-ID use cases
				- Specifically quite useful in this paper because the camera capture method involves a lot of constant data flow so a network would otherwise have to be regularly retrained
			- There has been a lot of success in using ML for human re-ID in the past but took longer for it to be used for animals
	- Best methods today would still be best used with a 'human-in-the-loop' approach as they still aren't perfect and having a human relabeling things will help to refine the training
	- 
- https://link.springer.com/article/10.1007/s42991-021-00215-1
	- Similarity learning networks for animal individual re-identification: an ecological perspective
	- Same authors as previous but more recent
	- Seems like a good expansion of above paper to get more detail and slightly updated info
	- Feature extraction has to have a custom design for each species while deep learning avoids this which makes it more generally useful
		- "deep learning provides a single species agnostic generalizable framework capable of solving animal re-ID for any species"
	- This paper calls the Siamese network a 'similarity comparison network', but they refer to the same thing
	- Difference between CNN and Siamese: "This can be achieved using the conventional CNN architecture with two modifications. First, we remove the final softmax layer of a conventional CNN and instead store the raw activation values. Second, we now consider two images instead of one, propagating each through the network in sequence. To then numerically quantify identity, we calculate the Euclidean distance of the two stored latent space embeddings. Animal individual identity is considered the same for small Euclidean distances while large distances are deemed to be a different individual."
	- With Siamese networks you still need the initial training with labeled images, but any new addition doesn't require re-training the model which is necessary for CNNs
	- two common loss functions used in similarity comparison networks:
		- contrastive loss: error calculated from a single pair of images of either the same or two different individuals "relative to the Euclidean distance of their latent space embeddings"
		- triplet loss: "consider two pairs of images with both pairs consisting of the same _anchor image_ with one pair being the same individual, and the other pair having different individuals. During training, both loss functions learn to modify the weights of the neural network to maximize the distance of the last layer’s latent space for dissimilar images, while minimizing the distance of similar images."
	- This paper explores 5 different similarity comparison networks used on 5 different species and tests with both loss functions. It also explores five CNN architectures that often come up in other research as well-performing
	- First use of Siamese Networks was actually for detecting signature forgery, only popularized in ecology much more recently, starting around 2018
	- re-ID has been done on giraffes using similarity comparison networks with success, good sign because it is largely based on the spots on the giraffe which is very similar to what we'd be doing with spots on the arctic charr
	- all of these past successes with similarity networks for re-ID have used contrastive loss, but seems like triplet loss is better and should definitely be explored
		- triplet loss has now been used for dolphins and seals which shows it is definitely capable of handling animal re-ID
	- Should use transfer learning and data augmentation
	- seems like I can generally take a lot from their methodology and do something fairly similar myself
- https://ieeexplore.ieee.org/document/9096922
	- Re-Identification of Zebrafish using Metric Learning
	- Siamese neural network used for re-ID of zebrafish, seems *very* similar to what I'm doing
	- Used side-view RGB images with success
	- Seems to use feature engineering and a relatively small dataset of only 6 individuals, so less similar than I initially thought but noteworthy
- https://www.researchgate.net/publication/313760206_Computer_assisted_photo-identification_of_humpback_whales
	- First use of computer vision for animal re-ID, done for humpback whales
	- Using database
- https://www.researchgate.net/profile/Sally-Mizroch/publication/291157559_Report_of_the_workshop_on_individual_recognition_and_the_estimation_of_cetacean_population_parameters/links/5807cdf008ae5ed04bfe7e78/Report-of-the-workshop-on-individual-recognition-and-the-estimation-of-cetacean-population-parameters.pdf#page=79
	- Similar as above but for sperm whales
	- Impressive at the time but still struggled with re-ID
- https://www.sciencedirect.com/science/article/pii/S0022098113004164
	- marine turtle re-ID using CNNs
	- First deep learning animal re-ID
- https://www.investopedia.com/terms/n/neuralnetwork.asp
	- Article on neural networks for more background
---
- Should be able to gather pretty much all other animal re-ID related sources from the sources of the above papers and the arctic charr UX paper and reading for those shouldn't be nearly as bad as the first two sources were, just need to get the idea of what they were doing
	- Still need sources for the whole packaging side of things
- Include more sources on other animal re-ID techniques, can also find sources from original diss sources
---
- https://ieeexplore.ieee.org/abstract/document/8614160
	- packaging ML model paper, think it's kind of about a specific one but the related work talks about other options to provide other things to read into
	- specifically about Acumos, but this may be a good option to look into further
	- designed for packaging a model into a docker image which seems great for my use case - ideal for the GPU lab machines and also makes it very portable so would be potentially easy to deploy?
	- Looks like the current code uses tensor flow so would likely be a good idea to just use whatever deployment method is usually used for tensor flow models
- https://dl.acm.org/doi/full/10.1145/3533378
	- Challenges in Deploying Machine Learning: A Survey of Case Studies
	- Discusses difficulties in using ML models through various case studies, should talk about how models can be deployed
	- meh not amazing source but good enough to include, will need more though and may need some that aren't just research papers
- https://neptune.ai/blog/ml-model-packaging
	- article talking about ML model deployment
	- has a section on tensorflow serving which I think is worth looking into further
	- also talks about containerization using docker (or k8s) so should look into that too
	- think I should use a git repo with a Dockerfile to set everything up and then clone it to the gpu pc and run docker there
		- this may still be a bit of a complicated set up process, but I'm hoping docker images can resolve any dependancies and then it's just a matter of setting up docker which clear instructions should be able to manage. Could also be helped with some startup script to automate the process
		- https://www.tensorflow.org/tfx/serving/docker
			- docs for tensorflow docker serving
			- as long as I'm using tensorflow this is almost definitely the best option, may partially be what is already done?
			- 