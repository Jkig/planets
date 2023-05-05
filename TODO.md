# Get the day/night cycle working

* getting it working without animation may be a good idea
* splitting the views app apart as well would be good, its pretty complicated rn
* calling shader inside the animatino function
* look at youtube videos about how to get shaders working

* I think the way i should be doing this is a seperate branch that goes to the testing app for firebase



* The changes needed to get the night map that looked good by itself were to change planetTexture to use standard material, and set map and emissive map to night earth, then set emissive to #ffe692 (also try something oranger to see if its better)
then intsensity to something like .1-.15 (may depend on color, as oranger may have less bleed into the oceans (ie more than that and oceans start glowing too much))

* ps setting emissive sets the color that is being emited, which then has values set by the emissive map

* try either using a color picker or website to adjust hex by eye for different results