import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

// import ProductCard from '../ProductCard'
// import ProductsHeader from '../ProductsHeader'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class ProfileSection extends Component {
  state = {
    activeProfile: [],
    isLoading: false,
    checkedItems: {},
    selectedOption: '',
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const {activeOptionId} = this.state

    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log('response', response.json())
    const fetchedData = await response.json()

    const firstJob = fetchedData.profile_details

    const updatedData = {
      name: firstJob.name,
      profileImageUrl: firstJob.profile_image_url,
      shortBio: firstJob.short_bio,
    }
    this.setState({
      activeProfile: updatedData,
      isLoading: false,
    })
    // console.log('mahesh', updatedData)
  }

  updateActiveOptionId = activeOptionId => {
    this.setState(
      {
        activeOptionId,
      },
      this.getProfileData,
    )
  }

  handleCheckboxChange = event => {
    const {employementType, setEmployementType} = this.props

    const {name, checked} = event.target
    this.setState(prevState => ({
      checkedItems: {
        ...prevState.checkedItems,
        [name]: checked,
      },
    }))
  }

  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value,
    })
  }

  renderProductsList = () => {
    const {activeProfile, activeOptionId, selectedOption} = this.state
    const {
      employementType,
      setEmployementType,
      salaryRange,
      setSalaryRange,
    } = this.props
    const {checkedItems} = this.state
    setEmployementType(checkedItems)
    setSalaryRange(selectedOption)
    console.log('checkedItems', checkedItems)

    return (
      <div className="profile-container">
        <div className="profile-container-2">
          <img
            src={activeProfile.profileImageUrl}
            alt="profile pic"
            className="profile-image"
          />
          <p className="profile-name">{activeProfile.name}</p>
          <p className="profile-bio">{activeProfile.shortBio}</p>
        </div>
        <hr />
        <div>
          <h1 className="l-text">Type of Employment</h1>
          {employmentTypesList.map(item => (
            <ul>
              <li>
                <input
                  type="checkbox"
                  id={checkedItems[item.employmentTypeId]}
                  name={item.label}
                  className="checkbox-input"
                  checked={checkedItems[item.employmentTypeId]}
                  onChange={this.handleCheckboxChange}
                />
                <label
                  key={item.label}
                  htmlFor={checkedItems[item.employmentTypeId]}
                  className="check-label"
                >
                  {item.label}
                </label>
              </li>
            </ul>
          ))}
        </div>
        <hr />
        <div>
          <h1 className="l-text">Salary Range</h1>
          {salaryRangesList.map(item => (
            <ul>
              <li>
                <input
                  type="radio"
                  id={item.salaryRangeId}
                  name="salaryRange"
                  className="checkbox-input"
                  value={item.salaryRangeId}
                  checked={selectedOption === item.salaryRangeId}
                  onChange={this.handleOptionChange}
                />
                <label htmlFor={item} className="check-label">
                  {item.label}
                </label>
              </li>
            </ul>
          ))}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderProductsList()
  }
}

export default ProfileSection
