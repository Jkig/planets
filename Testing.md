# Mainly preformance based
* planning to see if there are better ways than local storage, or better initalization of data
* pulling apart the functions and not doing excess calculation has huge benifits, 1.7 sec -> .1 sec improvmenet for handleCalculate vs justLuminosity


# Preformance testing notes:
* in testing, i run something 100x in a for loop, using preformance.now()