
Working as lector and proof-reader I regularly encounter the same tiny mistakes like double space, wrong ligatures etc. Here a provide a (hopefully growing) tool box to get rid of such stuff befor letting a human beeing find the really interesting mistakes. All scripts have been tested with InDesign Creative Cloud (2020-02-01). I also provide the python code which generates the InDesign-scripts, however it's rather quick-and-dirty code.

 * *ligatures*: The python prgram ``ligaturen.py`` uses the list ``ligaturliste`` to generate ``grep_ligatures.jsx`` which then can be used in InDesign to remove all wrong ligatures marking the changed text in green to allow for an easy cross check. After that check all green text can be switched to default again.

