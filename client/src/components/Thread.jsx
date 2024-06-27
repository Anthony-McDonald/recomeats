import React from 'react';
import '../css/forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect } from 'react';
import ForumHeader from './ForumHeader';
import RecipeThreadDiv from './RecipeThreadDiv';
import Interactions from './Interactions';
import Comment from './Comment'

const Thread = ({setAuth}) => {

    useEffect(() => {
        verifyAuthentication();
      }, []);
  

  return (
    <div id='thread-div'>   
        <ForumHeader/>
        <div id="thread-wrapper">
        <div id="left-sidebar-div">
                </div>
            <div id="thr-l">
            <RecipeThreadDiv/>
            <div id="interaction-div">
            <Interactions id="thread-interaction"/>
            <button type="button" class="btn btn-primary">Comment</button>
            <Comment/>
            <Comment/>
            <Comment/>

            </div>
            </div>
            <div id="thr-r">
            <div id="related-threads">
        <h4 className="related-title">
            Similar Recipes
        </h4>
    </div>
            </div>
        </div>

    </div>
  );

  async function verifyAuthentication() {
    try {
    const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/users/is-verify", {
      method: "GET",
      headers: {token: localStorage.getItem("token")}
    });

    const parseRes = await response.json();
    console.log(parseRes);

    parseRes === true ? setAuth(true) : setAuth(false)


  } catch (err) {
    console.error(err.message);
  }
  }
};

export default Thread;
