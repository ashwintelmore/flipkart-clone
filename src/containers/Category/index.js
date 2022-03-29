import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import Layout from '../../components/Layouts'
import { allCategoryData, createCategoryItem, deleteCategories, updateCategories } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input'
import NewModel from '../../components/UI/Model'
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload,
} from 'react-icons/io';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { logDOM } from '@testing-library/dom'
/**
* @author
* @function Category
**/

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoryImege, setCategoryImege] = useState('');
    const [categoryName, setCategoryName] = useState('')
    const [checked , setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray , setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const dispatch = useDispatch();
    const handleShow = () => setShow(true);
    const category = useSelector(state => state.category)
    // //console.log.log(category);
    const handleClose = () => {
        // we use FormData bcoz this function accept the file media from form but 
        // we cant send file type data throght the object(Actually we use for image handlling)
        const form = new FormData();

        if (categoryName) {
            form.append('name', categoryName);
            form.append('parentId', categoryParentId);
            form.append('categoryImage', categoryImege);
            //console.log.log(form);
            setCategoryName('');
            setCategoryParentId('');
            dispatch(createCategoryItem(form))
        }
        setShow(false);
    }
    // array 
    const getAllCategories = (categories) => {

        let MyCategories = [];
        for (let category of categories) {
            MyCategories.push(
                {
                    label:category.name,
                    value: category._id,
                    children: category.SubCategory.length > 0 && getAllCategories(category.SubCategory)
                }
                // <li key={category.name}>
                // {category.name}
                // {category.SubCategory.length > 0 ? (<ul >{getAllCategories(category.SubCategory)}</ul>) : null}
                //  </li>
            )
        }
        // //console.log.log(MyCategories);

        return MyCategories;
    }

    const createCategoryList = (categories, options = []) => {

        // let ;
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId : category.parentId
            })
            if (category.SubCategory.length > 0) {
                createCategoryList(category.SubCategory, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImege(e.target.files[0])
    }
    const checkedArrayExpandedArray = ()=>{
        const categories = createCategoryList(category.categoryList);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryID , index)=>{
           const category = categories.find((category , _index)=> categoryID == category.value);
           category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryID , index)=>{
           const category = categories.find((category , _index)=> categoryID == category.value);
           category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        //console.log.log({checked , expanded , categories , checkedArray , expandedArray});
    }

    const handleShowEditCategory = () =>{
        setShowEditCategory(true);
       checkedArrayExpandedArray() 
    }
   

    const updateCategoryValue = (key , changeValue , index , type)=>{
        if (type == "checked") {
           const updatedCheckedCategoryArrayName =  checkedArray.map((item , _index)=> index == _index ? {...item , [key]:changeValue} : item);
            setCheckedArray(updatedCheckedCategoryArrayName);
        }else if(type = "expanded") {
            const updatedExpandedCategoryArrayName =  expandedArray.map((item , _index)=> index == _index ? {...item , [key]:changeValue} : item);
            setExpandedArray(updatedExpandedCategoryArrayName); 
        }
    }

    const handleCloseEditCategory=()=>{

        const form = new FormData();

        expandedArray.forEach((item, index) =>{
            form.append('name' , item.name);
            form.append('_id' , item.value);
            form.append('parentId' , item.parentId ? item.parentId : "");
            form.append('type' , item.type);
        })
        checkedArray.forEach((item, index) =>{
            form.append('name' , item.name);
            form.append('_id' , item.value);
            form.append('parentId' , item.parentId ? item.parentId : "");
            form.append('type' , item.type);
        })

        dispatch(updateCategories(form));
        // dispatch(updateCategories(form)).then(result => {
        //     if (result) {
        //         dispatch(allCategoryData())
        //     }
        // })
        //console.log.log(form);
        setShowEditCategory(false);
    }

    const renderAddCategoryModel = ()=>{
        return (
                <NewModel
                ModelTitle="Add new Category"
                handleClose={handleClose}
                handleShow={handleShow}
                show = {show}
            >
                <Input
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => { setCategoryName(e.target.value) }}
                />
                <select
                    className="form-control"
                    value={categoryParentId}
                    onChange={(e) => { setCategoryParentId(e.target.value) }}
                >
                    <option >select category</option>
                    {
                        createCategoryList(category.categoryList).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </NewModel>
        )
    }
    const renderUpdateCategoryModel =() =>{
        return (
            <NewModel
            show = {showEditCategory}
            ModelTitle="Edit Category"
            handleClose={handleCloseEditCategory}
            handleShow={handleShowEditCategory}
            size="lg"
        >
            <h5>Expanded</h5>
            {   expandedArray.length > 0 &&
                expandedArray.map((item , index)=>
                        <Row key={index}>
                        <Col>
                            <Input
                                placeholder="Category Name"
                                value={item.name}
                                onChange={(e) => updateCategoryValue("name" , e.target.value , index , "expanded")}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => updateCategoryValue("parentId" , e.target.value , index , "expanded")}
                            >
                                <option >select category</option>
                                {
                                    createCategoryList(category.categoryList).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value='' >select category</option>
                                <option value='store' >store</option>
                                <option value='products' >products</option>
                                <option value='page' >page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h5>Checked</h5>
            {   checkedArray.length > 0 &&
                checkedArray.map((item , index)=>
                        <Row key={index}>
                        <Col>
                            <Input
                                placeholder="Category Name"
                                value={item.name}
                                onChange={(e) => updateCategoryValue("name" , e.target.value , index , "checked")}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => updateCategoryValue("parentId" , e.target.value , index , "checked")}
                            >
                                <option >select category</option>
                                {
                                    createCategoryList(category.categoryList).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value='' >select category</option>
                                <option value='store' >store</option>
                                <option value='products' >products</option>
                                <option value='page' >page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            
            {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </NewModel>
        )
    }

    const handleShowDeleteModel = ()=>{
        checkedArrayExpandedArray()
        setShowDeleteCategory(true);
    }
    const deletCategory = ()=>{
      
      const checkedIdsArray =   checkedArray.map((item , index)=> ({_id : item.value}))
      const expandedIdsArray =   expandedArray.map((item , index)=> ({_id : item.value}))
      const deleteIds = checkedIdsArray.concat(expandedIdsArray);
      //console.log.log(deleteIds);
      if (checkedIdsArray.length > 0) {
        dispatch(deleteCategories(checkedIdsArray))
        .then(result=>{
            if (result) {
                dispatch(allCategoryData());
                setShowDeleteCategory(false);
            }
        })
      }
    }

    const renderDeleteCategory = ()=>{
        return (
            <NewModel
                ModelTitle="Confirmation"
                handleShow={handleShowDeleteModel}
                handleClose={()=> { setShowDeleteCategory(false)}}
                show = {showDeleteCategory}
                buttons = {[
                    {
                        label: "No",
                        color:"primary",
                        onClick: ()=>{
                            alert("No");
                        }
                    },
                    {
                        label: "Yes",
                        color:"danger",
                        onClick: deletCategory
                    }
                ]}
            >
                <h5>Expanded</h5>
                {expandedArray.map((item , index) => 
                    <span key={index}>{item.name} , </span>
                )}
                <h5>Checked</h5>
                {checkedArray.map((item , index) => <span key={index}>{item.name} , </span>)}
            </NewModel>
        )
    }


    //array
    // //console.log.log(category);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3>Category</h3>
                            </div>
                            <div >
                                <button style={{marginLeft:'5px'}} onClick={handleShow}>ADD</button>
                                <button style={{marginLeft:'5px'}} onClick={handleShowDeleteModel} >Delete</button>
                                <button style={{marginLeft:'5px'}} onClick={handleShowEditCategory}>Edit</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>          {/* //array */}
                        <CheckboxTree
                            nodes={getAllCategories(category.categoryList)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked)=> setChecked(checked)}
                            onExpand={(expanded)=>setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                        {/* <ul>                
                            {getAllCategories(category.categoryList)}
                        </ul> */}
                    </Col>
                </Row>
                        {renderAddCategoryModel()}
                        {renderUpdateCategoryModel()}
                        {renderDeleteCategory()}
            </Container>
        </Layout>
    )

}

export default Category