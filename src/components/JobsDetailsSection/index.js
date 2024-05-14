import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

// import ProductCard from '../ProductCard'
// import ProductsHeader from '../ProductsHeader'
import './index.css'
import JobDetailsCard from '../JobDetailsCard'

class JobsDetailsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    searchText: '',
    mainData: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate() {
    // This code runs after every update (similar to useEffect with a dependency array)
    this.filterEmployementType()
    this.filterSalaryRange()
    // Compare previous props/state with current props/state and perform side effects if necessary
  }

  filterSalaryRange = () => {
    const {employementType, setEmployementType, salaryRange} = this.props
    const {productsList, mainData} = this.state

    console.log('salaryRange', salaryRange)

    const filteredData = productsList.filter(item => {
      const itemValue =
        parseFloat(item.packagePerAnnum.replace(' LPA', '')) * 100000
      return salaryRange === '' || itemValue >= parseInt(salaryRange)
    })
    if (filteredData.length === 0) {
      setTimeout(() => {
        this.setState({
          productsList: mainData,
        })
      }, 1000)
    } else if (filteredData.length !== 0) {
      setTimeout(() => {
        this.setState({
          productsList: filteredData,
        })
      }, 1000)
    }
    console.log('filteredData', filteredData)
  }

  filterEmployementType = () => {
    const {employementType, setEmployementType, salaryRange} = this.props
    const {searchText, productsList, mainData} = this.state

    if (employementType !== null) {
      const filtersArray = Object.entries(employementType)
        .filter(([type, isChecked]) => isChecked)
        .map(([type, isChecked]) => type)

      // Filter job listings based on checked checkboxes
      const newData = productsList.filter(job =>
        filtersArray.includes(job.employmentType),
      )

      if (newData.length === 0 && productsList !== mainData) {
        setTimeout(() => {
          this.setState({
            productsList: mainData,
          })
        }, 100)
      } else if (newData.length !== 0 && productsList !== newData) {
        setTimeout(() => {
          this.setState({
            productsList: newData,
          })
        }, 100)
      }
    }
  }

  getProducts = async () => {
    const {activeOptionId} = this.state

    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    // const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    const apiUrl = `https://apis.ccbp.in/jobs`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
        location: job.location,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        mainData: updatedData,
      })
      //   console.log('updatedData', updatedData)
    }
  }

  handletext = event => {
    console.log(event.target.value)
    this.setState({searchText: event.target.value})
  }

  handleSearch = event => {
    const {searchText, productsList, mainData} = this.state

    // const query = event.target.value
    if (searchText !== '') {
      const filteredItems = productsList.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      )

      this.setState({
        productsList: filteredItems,

        // isLoading: false,
      })
      console.log('kkl')
    } else {
      this.setState({
        productsList: mainData,

        // isLoading: false,
      })
      console.log('erri')
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState(
      {
        activeOptionId,
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, searchText} = this.state
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search History"
            className="input-box"
            onChange={e => this.handletext(e)}
            value={searchText}
          />
          <button onClick={this.handleSearch}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/search-img.png"
              alt="searchButton"
              className="search"
            />
          </button>
        </div>
        <ul className="products-list">
          {productsList.map(product => (
            <JobDetailsCard productData={product} key={product.id} />
          ))}{' '}
        </ul>
      </>
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

export default JobsDetailsSection
