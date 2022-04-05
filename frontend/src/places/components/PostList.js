import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Post from './Post'

const PostList = (props) => {
    if (props.items.length === 0) {
        return (
          <div className="place-list center">
            <Card>
              <h2>No places found. Maybe create one?</h2>
            </Card>
          </div>
        );
      }
    
      return (
        <ul className="place-list">
          {props.items.map(place => (
            <Post
              key={place.id}
              id={place.id}
              image={place.image}
              title={place.title}
              place_type={place.place_type}
              description={place.description}
              address={place.address}
              creatorId={place.username}
              coordinates={place.location}
              onDelete={props.onDeletePlace}
            />
          ))}
        </ul>
      );
  };

export default PostList;