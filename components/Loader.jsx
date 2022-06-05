import React from 'react'

function Loader() {
    function createMarkup() {
        return {
            __html: `
        <span style="--i:1"></span>
        <span style="--i:2"></span>
        <span style="--i:3"></span>
        <span style="--i:4"></span>
        <span style="--i:5"></span>
        <span style="--i:6"></span>
        <span style="--i:7"></span>
        <span style="--i:8"></span>
        <span style="--i:9"></span>
        <span style="--i:10"></span>
      `};
    }
    return (
        <div className="h-[80vh] flex items-center justify-center flex-col">
            <div className="loader" dangerouslySetInnerHTML={createMarkup()}>
            </div>
        </div>
    )
}

export default Loader