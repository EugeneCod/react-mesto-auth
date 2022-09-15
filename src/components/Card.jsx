import { useContext } from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__button-delete ${isOwn ? 'card__button-delete_visible' : 'card__button-delete_hidden'}`)

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__button-like ${isLiked && 'card__button-like_active'}`)

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return (
    <li className="card">
      <div className="card__image-container"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <p className="card__location">{card.name}</p>
      <div className="card__button-like-container">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
        <p className="card__likes-counter">{card.likes.length}</p>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
    </li>
  )
}

export default Card