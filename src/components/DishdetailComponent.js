import React, { Component, useState } from "react";
import {Card, CardImg,CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem, Button,Label,Col,Row,Modal,ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import '../App.css';
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) =>(val) => !(val) || (val.length <= len);
const minLength = (len) =>(val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentSubmit =this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(values) {
      this.toggleCommentFormModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);  
    
    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal} >
                        <span className='fa fa-pencil fa-lg' onClick={this.toggaleModal}></span> Submit Comment
                    </Button>

                    <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal}>
                        <ModalHeader toggle={this.toggleCommentFormModal} className="font-weight-bold">Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=> this.handleCommentSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                   <Col md={12} >
                                    <Control.select model=".rating" name="rating" 
                                    className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col> 
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name:</Label> 
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}>
                                    
                                        </Control.text>
                                        <Errors
                                            className='text-danger'
                                            model=".author"
                                            show="touched"
                                            messages={{
                                            required: 'Required ',
                                            minLength: "Must be greater than 2 characters ",
                                            maxLength: "Must be 15 Characters or less"
                                        }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment: </Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Your Comment: "
                                        className="form-control"
                                        rows="7" >
                                        </Control.textarea>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </React.Fragment>
        )
    }
}

    function RenderDish({dish}) {
        if(dish != null){
           return(
            <div className="col-12 col-md-5 mt-1">
               <Card>
                   <CardImg width="100%"  src={baseUrl + dish.image} alt={dish.name} />
                   <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
            </div>
           );
        }
        else{
           return(
               <div></div>
           );
        }
   }
   const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <p>
      <div className="star-rating">rating: 
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="fa fa-star"></span>
            </button>
          );
        })}
      </div></p>
    );
  };

   
function RenderComments({comments, postComment,dishId}) {
        if (comments != null) 
            return(
                <div className='col-12 col-md-5 mt-1'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author},
                                    &nbsp;
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(comment.date))}
                                    </p>
                                   <StarRating />
                                   <p>{comment.rating}</p>
                                   
                                   
                                
                                </li>
                              );
                          })}
                    </ul>
                    <br />
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>            
                );
            else
                return(
                    <div></div>
                )
         }

   const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null)
        return (
            <div className="container">
                 <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row '>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments= {props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );

    else 
        return(
            <div></div>
        );
     }
   

export default DishDetail;  