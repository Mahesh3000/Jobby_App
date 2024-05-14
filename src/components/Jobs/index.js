import {useState} from 'react'

import JobsDetailsSection from '../JobsDetailsSection'
import Header from '../Header'
import ProfileSection from '../ProfileSection'

const Jobs = () => {
  const [employementType, setEmployementType] = useState({})
  const [salaryRange, setSalaryRange] = useState('')

  return (
    <>
      <Header />
      <div className="product-sections">
        <div
          style={{display: 'flex', height: '100%', backgroundColor: 'black'}}
        >
          <div style={{flex: '0 0 30%'}}>
            <ProfileSection
              employementType={employementType}
              setEmployementType={setEmployementType}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
            />
          </div>
          <div style={{flex: '0 0 70%'}}>
            <JobsDetailsSection
              employementType={employementType}
              salaryRange={salaryRange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs
