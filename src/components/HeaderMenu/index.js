import React, { useEffect, useState } from 'react'
import { allCategoryData } from '../../actions';
import { useSelector, useDispatch } from 'react-redux'
import './style.css'

/**
* @author
* @function HeaderMenu
**/



const HeaderMenu = (props) => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allCategoryData())
    }, [])

    const getAllCategories = (categories) => {

        let MyCategories = [];
        for (let category of categories) {
            MyCategories.push(
                <li key={category.name}>

                    {
                        category.parentId ? 
                        <a href={`${category.slug}`}>
                            {category.name}
                        </a> :
                            <span>{category.name}</span>
                    }
                    {category.SubCategory.length > 0 ? (<ul >{getAllCategories(category.SubCategory)}</ul>) : null}
                </li>
                //     <li key={category.name}>
                //     {
                //       category.parentId ? <a
                //         href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                //         {category.name}
                //       </a> :
                //       <span>{category.name}</span>
                //     }
                //     {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                //   </li>
            )
        }

        console.log(MyCategories);
        return MyCategories;
    }
    console.log(category.categoryList);
    return (
        <div className='menuHeader'>
            <ul>

                {category.categoryList.length > 0 ? getAllCategories(category.categoryList) : <span>onn</span>}
            </ul>

        </div>
    )

}

export default HeaderMenu