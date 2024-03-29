/* eslint-disable no-unused-vars */
import { API_TOKEN } from "../../constants/constans"
import {  ADD_NEW_POST, COM_MENT, DELETE_POST,   SET_ALL_POSTS, UPDATE_POST } from "../types/postTypes"
import axios from 'axios'
import { axiosInstance } from "../../cfg/axios"

export const setAllPosts = (allPosts) => ({
	type: SET_ALL_POSTS,
	payload: allPosts
})

export const loadAllPosts = (searchValue, token) => async (dispatch) => {
  const urlForFetch = searchValue
  ? `https://api.react-learning.ru/posts/search/?query=${searchValue}`
  : "https://api.react-learning.ru/posts";

	const response = await fetch(urlForFetch , {
		headers: {
			authorization: `Bearer ${token}` 
		}
	})


	const postsFromApi = await response.json()

	dispatch(setAllPosts(postsFromApi))

}


export const addNewPost = (allPosts) => ({
	type: ADD_NEW_POST,
	payload: allPosts
})

export const queryNewPost = (post, token) => async (dispatch) => {

	const response = await fetch('https://api.react-learning.ru/posts', {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
		body: post
	})

	const postFromApi = await response.json()

	dispatch(addNewPost(postFromApi))

}

export const deletePost = (_id) => ({
	type: DELETE_POST,
	payload: _id
})
export const deletePostQuery = (_id, token) => async (dispatch) =>{
	
	const response= await fetch(`https://api.react-learning.ru/posts/${_id}`, {
		method: 'DELETE',
		headers: {
			authorization: `Bearer ${token}`
		} ,		
	})	
	if(response.status === 200) {		
		dispatch(deletePost(_id))
	}
}

export const addNewComm = (allComm) => ({
	type: COM_MENT,
	payload: allComm
})

export const queryNewComm = (comments, token, _id, ) => async (dispatch) => {
	const response = await fetch(`https://api.react-learning.ru/posts/comments/${_id}`, {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
		body: comments
	})
	const commFromApi = await response.json()

	dispatch(addNewComm(commFromApi))

}