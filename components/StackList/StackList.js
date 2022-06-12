import React from 'react'
import * as icon from 'react-icons/si';

const StackList = () => {
    return (
        <section className='stackList'>
            <h3>My Stack</h3>
            <ul className='item-stacks'>
                <li className='item-stack'><icon.SiHtml5 /></li>
                <li className='item-stack'><icon.SiCss3 /></li>
                <li className='item-stack'><icon.SiJavascript /></li>
                <li className='item-stack'><icon.SiReact /></li>
                <li className='item-stack'><icon.SiNextdotjs /></li>
            </ul>
            <style jsx>{`
                .item-stacks {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-evenly;
                    aligh-items: center;
                    gap: 20px;
                    padding: 10px;
                    
                }
                .item-stack {
                    list-style: none;
                    font-size: 4.5rem;
                }
                `}
            </style>
        </section>
    )
}

export default StackList;