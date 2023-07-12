There is no buildscript set up, so, before any changes, delete dist.
Then, after changes are done, choose 1:
	Build through .bat:
		launch build.bat
	Build manually:
		npx tsc --outdir dist
This will make it so that future executions run faster.