import React ,{Component}from 'react'


export default function resultEmpty(){
    return(
        <div className="content-empty">
                    <div className="content-empty-image-container">
                        <p className="content-empty-text">
                         Content is empty
                        </p>
                        <img
                        className="content-empty-image"
                            src="https://enterprise40.s3.eu-west-2.amazonaws.com/ExciteInfographs/Empty.png"
                        />  
                         </div>
                </div>
    )
}