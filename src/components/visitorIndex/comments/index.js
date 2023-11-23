import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSyncAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {getUserData, isLogin, parseDate, parseDateAndTime, STRINGS} from "../../../utils/base";
import {API} from "../../../utils/services";

const Comments = (props) => {
    let {data,onDelete,onDeleted} = props;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            setComments(data)
        }
    }, []);

    const handleDeleteComment = (comment) => {
        onDelete();
        API.BLOGS.deleteComment(comment.id).then((res) => {
            if (res.status) {
                alert("Comment Deleted.");
                onDeleted();
            } else {
                alert(res.error);
                onDeleted()
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="panel panel-default widget">
                        <div className="panel-heading">
                            <FontAwesomeIcon icon={faComment} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}
                                             className="glyphicon glyphicon-comment mr-4"/>
                            <h3 className="panel-title">
                                Recent Comments</h3>
                            <span className="label label-info">
                    {comments.length}</span>
                        </div>
                        <div className="panel-body">
                            <ul className="list-group">
                                {
                                    comments.length > 0 &&
                                    comments.map((comment) =>
                                        <li className="list-group-item">
                                            <div className="row">
                                                {/*<div className="col-xs-2 col-md-1">*/}
                                                {/*    <img src="http://placehold.it/80" className="img-circle img-responsive"*/}
                                                {/*         alt=""/>*/}
                                                {/*</div>*/}
                                                <div className="col-md-12">
                                                    <div>
                                                        {/*<a href="http://bootsnipp.com/BhaumikPatel/snippets/4ldn">Cool Sign Up</a>*/}
                                                        <div className="mic-info">
                                                            Comment By: <NavLink to="#"> {comment.name} - {comment.email} </NavLink> on {parseDateAndTime(parseDate(new Date(comment.createdOn)))}
                                                        </div>
                                                    </div>
                                                    <div className="comment-text">
                                                        {comment.comment}
                                                    </div>
                                                    {
                                                        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                            <div className="act">
                                                                <button type="button"
                                                                        onClick={() => handleDeleteComment(comment)}
                                                                        className="btn btn-danger btn-xs"
                                                                        title="Delete">
                                                                    <FontAwesomeIcon icon={faTrashAlt}
                                                                                     className="glyphicon glyphicon-trash"/>
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                            {
                                comments.length === 10 && (
                                    <NavLink to="#" className="btn btn-primary btn-sm btn-block" role="button">

                                        <FontAwesomeIcon icon={faSyncAlt} className="glyphicon glyphicon-refresh"/>
                                        More</NavLink>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;