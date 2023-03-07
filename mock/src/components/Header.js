import React from 'react';
import { BrowserRouter, NavLink ,Route,Routes } from 'react-router-dom';
import '../css/Header.css';
import logo from '../images/logo.png';
import Home from './Home';


function Header({geners, sortType, setSortType, genreType , setGenreType,searchkey,setSearchkey}) {


    let c = 0;
    function createMenu() {
        
        if (document.getElementById("dropdown2").childElementCount != 0) {
            return;
        }
        c=1;
    let currUl = document.createElement("ul");
    currUl.setAttribute("style","border-left: 0px solid black;margin-left: 0px;")
    geners.forEach(element => {
        if (element != "") {
        if (c >= 6) {
            document.getElementById("dropdown2").append(currUl);
            currUl = document.createElement("ul");
            c = 1;
        }
        let currLi = document.createElement("li");
        let btn = document.createElement("button");
        btn.addEventListener("click", () => {setGenreType(element);setSortType("all")});
        btn.innerHTML = element;
        currLi.append(btn);
        currUl.append(currLi);
        c+=1;
    }
    });
    document.getElementById("dropdown2").append(currUl);

    
    }

    function showDropDown() {
        document.getElementById("dropdown2").setAttribute("class","mega-dropdown");
        if (document.getElementById("dropdown1").getAttribute("class").includes("active")) {
            document.getElementById("dropdown1").setAttribute("class","nav-dropdown"); 
        }
        else 
        document.getElementById("dropdown1").setAttribute("class","nav-dropdown-active"); 
    
}
function showGenreDrop(){
    createMenu();
    document.getElementById("dropdown1").setAttribute("class",'nav-dropdown');
    if(document.getElementById("dropdown2").getAttribute("class").includes("active")){
        document.getElementById("dropdown2").setAttribute("class",'mega-dropdown');
    }
    else
    document.getElementById("dropdown2").setAttribute("class","mega-dropdown-active");
}

    return ( 
        <>
            <BrowserRouter>

        <div className='bg-color navbar navbar-expand-lg sticky-top rounded-bottom-3 rounded-top-3'>
            <nav className='navbar container-fluid navigation-bar'>
                <img style={{margin:'2px'}} src={logo} alt="hi" height='60' className='im text-dark' width='60'></img>
                <p className='navbar-nav text-dark'><b style={{opacity:'1'}}>Listen What You Crave For</b></p>


                <ul className='menu-itemsss' style={{display:'flex' , alignContent:'center', justifyContent:"space-between", width:'40%' , color:"black"}} >
                <li className='nav-item'  >
                        <div className='nav-link' >
                        
                            <button className='btn'  onClick={showDropDown}><b style={{color:"black"}}>Sort By</b></button>

                                <ul  id='dropdown1' class="nav-dropdown" >
                                    <li >
                                    <button onClick={()=>{setSortType("a-z")}}>sort by a-z</button>
                                    </li>
                                    <li >
                                    <button onClick={()=>{setSortType("z-a")}}>sort by z-a</button>
                                    </li>
                                    <li >
                                    <button onClick={()=>{setSortType("vowels")}}>starting with vowels</button>
                                    </li>
                                    <li >
                                    <button onClick={()=>{setSortType("length")}}>by title length</button>
                                    </li>
                                </ul>

                        </div>
                        
                    </li>

                    <li className='nav-item'>
                        <div className='nav-link'>
                            <button className='btn' onClick={showGenreDrop}><b style={{color:"black"}}>Genre</b></button>
                            <div id='dropdown2' class="mega-dropdown"  >
                            
                            </div>
                        </div>
                        
                    </li>

                    <li className='nav-item' >
                                <div className='nav-link search-total' to="/">
                                    <input class="form-control form-link search-textbox nav-link" onSubmit={() => {document.getElementById("SubmitBtn").click()}} type="search" placeholder="Search" aria-label="Search" id='searchbox'/>
                                    <button class=" btn" id="SubmitBtn" type="submit" value={searchkey} onClick={()=>{setSearchkey(document.getElementById("searchbox").value)}} ><b style={{color:"black"}}>Search</b></button>
                                </div>
                            </li>
                </ul>
            </nav>
        </div>



  

                </BrowserRouter>
        </>
     );
}

export default Header;