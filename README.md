# Data Annotation - Code test

## Test conditions

Given a url to a google doc containing a table of x, y and unicode glyph, print out the relevant unicode glyph in position. The resulting printout will be a secret message.

## Approach

Fetch the raw HTML for the google doc, load the content into cheerio and lookup the relevant tags for the table.

Find the table rows and iterate through looking for x, y and glyph.

Format the table into a y, x object for easy lookup during printing.

Loop through the max, min of x, y and print out each glyph.

## External libraries

[Cheerio](https://www.npmjs.com/package/cheerio)
