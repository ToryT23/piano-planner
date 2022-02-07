import  React from "react"
import { Route } from "react-router-dom"
import { ProgressPost } from "./progresspost/ProgressPost"
import { ProgressPostForm } from "./progresspost/ProgressPostForm"

export const ApplicationViews = () => {
    return(
         <>
     <Route exact path="/progressPost">
                <ProgressPost />
    </Route>
    <Route exact path="/progressPost/create">
             <ProgressPostForm />
            </Route>
    
    </>


)
}