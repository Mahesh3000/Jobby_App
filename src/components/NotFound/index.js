import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <p className="not-text">Oops! Something went wrong</p>
    <p className="not-text-2">
      We are sorry, the page you requested could not be found
    </p>
    <button
      type="button"
      className="retry-desktop-btn"
      //   onClick={onClickLogout}
    >
      Retry
    </button>
  </div>
)

export default NotFound
