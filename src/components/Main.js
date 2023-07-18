import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

function Main({
                  onCardClick,
                  onEditAvatar,
                  onEditProfile,
                  onAddPlace,
                  cards,
                  onCardLike,
                  onCardDelete,
                  loggedIn,
                  logOut,
                  email
              }) {
    const currentUser = React.useContext(CurrentUserContext);


    const cardElements = cards.map(item => {
        return (<Card key={item._id} cardData={item} onCardClick={onCardClick} onCardLike={onCardLike}
                      onCardDelete={onCardDelete}/>)
    })

    return (
        <>
            <Header loggedIn={loggedIn} linkName="Выйти" linkPath="/sign-in" onClick={logOut} email={email}/>
            <main>
                <section className="profile page__profile">
                    <button type="submit" className="profile__avatar-button" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar"/>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit" onClick={onEditProfile}></button>
                        <p className="profile__text">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
                </section>
                <section className="elements page__elements">
                    {cardElements}
                </section>
            </main>
            <Footer/>

        </>
    )
}


export default Main;