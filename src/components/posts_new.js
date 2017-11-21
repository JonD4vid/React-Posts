import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component{
    renderField(field){
const { meta: {touched, error } } = field; 
const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                className="form-control" 
                type="text"
                {...field.input}
                //... means this is an object and 
                //the properties are to be communicated as props to the input tag
                />

               <div className="text-help">
                   
                {touched ? error : ''}
                </div>
                </div>
        );
    }
   
onSubmit(values){
    console.log(values);
    this.props.history.push('/');
    this.props.createPost(values, () => {
        this.props.history.push('/');
        
    });
}
    render() {
            const { handleSubmit } = this.props;

        return (
           <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
            label="Title"
            name ="title"
            component={this.renderField}
            /> 
            <Field
                label="Category"
                name="categories"
                component={this.renderField}
            />
            <Field
                label="Enter Post here:"
                name="content"
                component={this.renderField}
            />
            
            <button type="submit"
                   className="btn btn-primary">Submit</button>
            <Link to="/" className ="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    //values contains all input info of fields
    const errors ={};

    //validate the inputs from 'values'
if(!values.title){
    errors.title ="Enter a title";

}
if(!values.categories){
    errors.categories="Enter a category";
}
if (!values.content){
    errors.content="Enter some content";
}

    //if errors is empty, form is fine to submit
    //if errors has any properties, redux form assumes form is invalid
    
    return errors;

}

export default reduxForm({
    validate,    
    form: 'PostsNewForm'
})(
    connect (null,{ createPost})(PostsNew)
);


//PostsEdit.js
//export default reduxForm({
//    form: 'PostsNewForm'
//     })(PostsNew);

