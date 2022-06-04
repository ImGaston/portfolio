import React from 'react';
import Image from 'next/image'

const ProjectList = () => {
    return (
        <section className='projects'>
            <div className='cards'>
                {/* <Image></Image> */}
                <h3>1</h3>
                <span></span>
            </div>
            <div className='cards'>
                {/* <Image></Image> */}
                <h3>2</h3>
                <span></span>
            </div>
            <div className='cards'>
                {/* <Image></Image> */}
                <h3>3</h3>
                <span></span>
            </div>
            <div className='cards'>
                {/* <Image></Image> */}
                <h3>4</h3>
                <span></span>
            </div>
            <style jsx>{`
                .projects {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .cards {
                    width: 300px;
                    border: 1px dashed #000;
                    padding: 1em;
                    margin: 2px;
                }
                `}
            </style>
        </section>
    )
}

export default ProjectList;