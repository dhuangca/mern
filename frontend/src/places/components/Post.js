import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './Post.css'

const Post = props => {
    return (
        <React.Fragment>
            <Card className="post-item">
              <div className="post-item__info">
                <h2>Title: {props.title}</h2>
                <h4>created by: {props.creatorId}</h4>
                <h4>Type: {props.place_type}</h4>
                <h4>Address: {props.address}</h4>
                <p>Description: {props.description}</p>
              </div>
            </Card>

        </React.Fragment>
    )
}

export default Post;