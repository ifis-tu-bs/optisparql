# OptiSparql 🐿️
Testsuite for SPARQL OPTIMAL queries

## Installing and running the testsuite
1. Download and install [Node.js](https://nodejs.org). Make sure the install wizard downloads NPM as well (it does per default).
2. Clone this repository using Git: `git clone https://github.com/ifis-tu-bs/optisparql.git` **OR** download the repository using the browser and unzip it.
3. Navigate to the *testsuite* directory inside the project using your shell (or the Node.js Bash shell on Windows).
4. (Optional) Install the dependencies by running `npm install`
5. You can now start the application by running `npm start`
6. Open your browser and navigate to the page displayed to you. Usually, this is http://localhost:8080.

## Using the testsuite
1. Open the *tests* directory inside this project.
2. Choose a test that you want to run.
3. Copy the selected variables from *orig.ql* into the *Selection* input field
4. Copy the header information from *orig.ql* into the *Headers* textarea
5. Copy the entire content from *optimal.json* into the main *JSON query representation* textarea
6. Click *Generate SPARQL Queries* to create OPTIMAL encodings for your query
7. Click *Test generated SPARQL queries* to run the performance test
8. If everything worked out, the text above the encodings should now indicate the queries' execution times