import './index.css'

const JobDetailsCard = props => {
  const {productData} = props
  const {
    title,
    packagePerAnnum,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    jobDescription,
  } = productData

  return (
    <li className="product-item">
      <div className="job-desc">
        <img src={companyLogoUrl} alt="product" className="thumbnail" />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="product-details">
          <div className="llp">
            <p className="brand">{location}</p>
            <p className="price">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="white-hr" />
      <p className="package">Description</p>
      <p className="brand">{jobDescription}</p>
    </li>
  )
}
export default JobDetailsCard
