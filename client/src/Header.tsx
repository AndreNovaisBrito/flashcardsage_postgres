import './Header.css';

export default function Header(){
    return(
        <div className='Header'>
            <div className="container">
                <div>
                    <a href={'/'}>FlashCardSage</a>
                </div>
                <div>
                    <a href={'/'}>Decks</a>
                </div>
                <div>
                    <a href={'/'}>Login</a>
            </div>
            </div>
        </div>
    )
}