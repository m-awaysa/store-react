import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <>
            <h3 className='text-center'>About</h3>
            <div className="w-100 text-center row p-2 p-sm-5 pt-0">
                <div className="col-md-4">
                    <svg className="bd-placeholder-img rounded-circle" width={140} height={140} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                    <h2 className="fw-normal">Heading</h2>
                    <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
                    <p><Link className="btn btn-secondary" to="#">View details »</Link></p>
                </div>{/* /.col-lg-4 */}
                <div className="col-md-4">
                    <svg className="bd-placeholder-img rounded-circle" width={140} height={140} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                    <h2 className="fw-normal">Heading</h2>
                    <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                    <p><Link className="btn btn-secondary" to="#">View details »</Link></p>
                </div>{/* /.col-lg-4 */}
                <div className="col-md-4">
                    <svg className="bd-placeholder-img rounded-circle" width={140} height={140} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                    <h2 className="fw-normal">Heading</h2>
                    <p>And lastly this, the third column of representative placeholder content.</p>
                    <p><Link className="btn btn-secondary" to="#">View details »</Link></p>
                </div>{/* /.col-lg-4 */}
            </div>{/* /.row */}

        </>
    )
}

export default About