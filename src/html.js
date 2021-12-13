import React from 'react'

const HTML =(props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {props.headComponents}
        <link href="/img/favicon.ico" rel="icon" />
      </head>
      <body>
        <div
          id="___gatsby"
          
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
export default HTML;
