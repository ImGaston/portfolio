import React from 'react';
import Image from 'next/image'
import CardProject from '../CardProject/CardProject';

const ProjectList = () => {
    return (
        <section className='projects'>
            <div className='cards'>
                <div className='prueba'>prueba</div>
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
            <CardProject />
            <style jsx>{`
                .projects {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .cards {
                    width: 300px;
                    height: 250px;
                    border: 1px dashed #000;
                    padding: 1rem;
                    background-color: #4C243B;
                }
                .prueba {
                    background-color: #B84A62;
                }
                `}
            </style>
        </section>
    )
}

export default ProjectList;