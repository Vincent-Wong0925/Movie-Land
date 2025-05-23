import React, { useEffect, useState } from "react";
import './commentPrompt.css';
import '../../index.css';
import { useSelector } from "react-redux";
import { selectAuthenticated, selectUser } from '../../store/features/userSlice';
import { addComment, deleteComment, fetchUserComments, updateComment } from "../../api";
import { ScoreStar } from "../comments";

const PromptStar = ({ value, score, setScore }) => {
    return (
        <button className="prompt-star" value={value} onClick={() => {setScore(value)}} >
            <span className="lime star">
                {value <= score ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>}
            </span>
        </button >)
}

const CommentPrompt = ({movie_id, setComments}) => {
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [myComment, setMyComment] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [update, setUpdate] = useState(true);

    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserComments(user.id, movie_id)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                if (response.rowCount !== 0) {
                    setEditMode(true);
                    setMyComment(response.rows[0]);
                } else {
                    setEditMode(false);
                }
            })
            .catch(err => console.log(err));
        }
    }, [isAuthenticated, movie_id, user, update]);

    const handleSubmitComment = () => {
        if (score === 0 || comment === '') {
            return alert('Missing information');
        }
        
        addComment(user.id, movie_id, score, comment)
        .then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            setComments(response.result);
            setComment('');
            setScore(0);
            setUpdate(state => !state);
        })
        .catch(err => console.log(err));
    }

    const handleUpdateComment = () => {
        if (score === 0 || comment === '') {
            return alert('Missing information');
        }
        
        updateComment(user.id, movie_id, score, comment)
        .then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            setComments(response.result);
            setComment('');
            setScore(0);
            setUpdate(state => !state);
        })
        .catch(err => console.log(err));
    }

    const handleDeleteComment = () => {
        deleteComment(user.id, movie_id)
        .then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            setComments(response.result);
            setUpdate(state => !state);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="CommentPrompt">
            <div className="prompt-heading">{user.username}</div>
            {Array(5).fill(0).map((_, idx) =>
                <PromptStar value={idx + 1} score={score} setScore={setScore} />
            )}
            <br /><textarea className="prompt-text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={editMode ? 'Edit your comment' : 'Leave a comment'} rows='5' />
            <button className="prompt-btn" onClick={editMode ? handleUpdateComment : handleSubmitComment}>Submit</button>
            {editMode && 
            <div className="previous-comment">
                <div className="prompt-heading">Your comment</div>
                <div className="comment-card" id={myComment.user_id}>
                    <div className="comment-card-item">{myComment.username}</div>
                    <ScoreStar className="comment-card-item" score={myComment.score} />
                    <div className="comment-card-item comment-card-body">{myComment.comment}</div>
                </div>
                <button className="prompt-delete-btn" onClick={handleDeleteComment}>Delete comment</button>
            </div>}
        </div>
    )
}

export default CommentPrompt;