import Puppeteer from 'lib/puppeteer';
import fs from 'fs';
import uuid from 'uuid/v4';

export default async ( req, res ) => {
  /* Get the html body */
  const { html, sendFile, urlToPDF } = req.body;

  /* Generate a unique filename */
  const filename = uuid();

  /* Write html to file if the user sends HTML data*/
  if( html ){
    await fsWrite( `${__dirname}/../../../tmp/${filename}.html`, html );
  }

  /* Render to a PDF document */
  if( html ){
    await Puppeteer.renderHTMLToPDF( filename );
  }
  else {
    await Puppeteer.renderURLToPDF( filename, {}, {urlToPDF} );
  }
  /* If `sendFile` was set to a truthy value then return the file straight away instead of the link */
  if ( sendFile ) {
    /* Read the file */
    const file = await fsRead( `${__dirname}/../../../tmp/${filename}.pdf` );

    /* Send the file back to the user */
    res.send( file );
  } else {
    /* Return the path of the pdf */
    res.json({ path: `/docs/${filename}.pdf` });
  }
};

async function fsWrite( filename, data ) {
  fs.writeFile( filename, data, err => {
    if ( err ) {
      throw new Error( err );
    }

    return;
  });
}

async function fsRead( filename ) {
  return new Promise(( resolve, reject ) => {
    fs.readFile( filename, ( err, data ) => {
      if ( err ) {
        reject( err );
      }

      resolve( data );
    });
  });
}
