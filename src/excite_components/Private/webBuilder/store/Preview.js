import React from 'react'


export default function PageDemo(props) {
    const pageData = props.Page
    function createMarkup() {
        return {
          __html: `${pageData}`
        };
      }

    return (
        <div>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}
 